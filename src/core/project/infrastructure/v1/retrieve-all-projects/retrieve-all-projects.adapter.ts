import { prismaService, S3Service } from '@/core/core-utils'
import {
  RetrieveAllProjectsGateway,
  retrieveAllProjectsResponse
} from '@/core/project/domain'

export class RetrieveAllProjectsAdapterV1
  implements RetrieveAllProjectsGateway
{
  async execute(): Promise<retrieveAllProjectsResponse> {
    try {
      prismaService.$connect()

      const projects = await prismaService.project.findMany({
        include: {
          media: true,
          ProjectTechnology: {
            select: { technology: { include: { media: true, Stack: true } } }
          }
        }
      })

      const files = await S3Service.getFiles(
        projects.map((project) => project.media.key)
      )

      return {
        projects: projects.map((project, index) => ({
          id: project.id,
          name: project.name,
          url: project.url,
          description: project.description,
          technologies: project.ProjectTechnology.map((tech) => {
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
            id: project.media.id,
            name: project.media.name,
            key: project.media.key,
            description: project.media.description,
            createdAt: project.media.createdAt,
            updatedAt: project.media.updatedAt
          },
          mediaAccess: {
            mediaUrl: files[index].response,
            mediaExpiration: new Date(
              Date.now() + files[index].expiration * 1000
            ),
            key: files[index].key
          },
          createdAt: project.createdAt,
          updatedAt: project.updatedAt
        }))
      }
    } finally {
      prismaService.$disconnect()
    }
  }
}
