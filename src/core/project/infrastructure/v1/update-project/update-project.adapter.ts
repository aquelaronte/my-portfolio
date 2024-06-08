import { errorService, prismaService } from '@/core/core-utils'
import {
  updateProjectCredentials,
  UpdateProjectGateway,
  updateProjectResponse
} from '@/core/project/domain'

export class UpdateProjectAdapterV1 implements UpdateProjectGateway {
  async execute({
    id,
    projectAttributes
  }: updateProjectCredentials): Promise<updateProjectResponse> {
    try {
      await prismaService.$connect()

      const verifyProject = await prismaService.project.findUnique({
        where: { id }
      })

      if (!verifyProject) {
        throw errorService.projectNotFound
      }

      if (projectAttributes.technologies) {
        await prismaService.projectTechnology.deleteMany({
          where: { projectId: id }
        })

        for (const tech of projectAttributes.technologies) {
          await prismaService.projectTechnology.create({
            data: {
              projectId: id,
              technologyId: tech.id
            }
          })
        }
      }

      const updatedProject = await prismaService.project.update({
        where: { id },
        data: {
          name: projectAttributes.name,
          description: projectAttributes.description,
          url: projectAttributes.url,
          mediaId: projectAttributes.media?.id
        },
        include: {
          media: true,
          ProjectTechnology: {
            select: { technology: { include: { media: true, Stack: true } } }
          }
        }
      })

      return {
        updatedProject: {
          id: updatedProject.id,
          description: updatedProject.description,
          name: updatedProject.name,
          media: updatedProject.media,
          url: updatedProject.url,
          technologies: updatedProject.ProjectTechnology.map((tech) => {
            return {
              id: tech.technology.id,
              name: tech.technology.name,
              media: tech.technology.media,
              stack: tech.technology.Stack,
              createdAt: tech.technology.createdAt,
              updatedAt: tech.technology.updatedAt,
              rate: tech.technology.rate,
              description: tech.technology.description
            }
          }),
          createdAt: updatedProject.createdAt,
          updatedAt: updatedProject.updatedAt
        }
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
