import { errorService, prismaService } from '@/core/core-utils'
import {
  deleteProjectCredentials,
  DeleteProjectGateway,
  deleteProjectResponse
} from '@/core/project/domain'

export class DeleteProjectAdapterV1 implements DeleteProjectGateway {
  async execute({
    id
  }: deleteProjectCredentials): Promise<deleteProjectResponse> {
    try {
      await prismaService.$connect()

      const verifyProject = await prismaService.project.findUnique({
        where: { id },
        include: {
          media: true,
          ProjectTechnology: {
            select: { technology: { include: { Stack: true, media: true } } }
          }
        }
      })

      if (!verifyProject) {
        throw errorService.projectNotFound
      }

      await prismaService.project.delete({ where: { id } })

      return {
        deletedProject: {
          id: verifyProject.id,
          name: verifyProject.name,
          url: verifyProject.url,
          description: verifyProject.description,
          technologies: verifyProject.ProjectTechnology.map((tech) => {
            return {
              id: tech.technology.id,
              name: tech.technology.name,
              description: tech.technology.description,
              rate: tech.technology.rate,
              media: tech.technology.media,
              stack: tech.technology.Stack,
              createdAt: tech.technology.createdAt,
              updatedAt: tech.technology.updatedAt
            }
          }),
          media: {
            id: verifyProject.media.id,
            name: verifyProject.media.name,
            key: verifyProject.media.key,
            description: verifyProject.media.description,
            createdAt: verifyProject.media.createdAt,
            updatedAt: verifyProject.media.updatedAt
          },
          createdAt: verifyProject.createdAt,
          updatedAt: verifyProject.updatedAt
        }
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
