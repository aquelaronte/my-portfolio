import { prismaService, S3Service } from '@/core/core-utils'
import {
  createProjectCredentials,
  CreateProjectGateway,
  createProjectResponse
} from '@/core/project/domain'

export class CreateProjectAdapterV1 implements CreateProjectGateway {
  async execute({
    name,
    url,
    description,
    mediaId
  }: createProjectCredentials): Promise<createProjectResponse> {
    try {
      await prismaService.$connect()

      const project = await prismaService.project.create({
        data: {
          name,
          url,
          description,
          mediaId
        },
        include: {
          media: true,
          ProjectTechnology: {
            select: {
              technology: {
                include: {
                  media: true,
                  Stack: {}
                }
              }
            }
          }
        }
      })

      const mediaAccess = await S3Service.getFile(project.media.key)

      return {
        createdProject: {
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
            createdAt: project.media.createdAt,
            updatedAt: project.media.updatedAt,
            description: project.media.description,
            key: project.media.key
          },
          mediaUrl: mediaAccess.response,
          mediaExpiration: mediaAccess.expiration,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt
        }
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
