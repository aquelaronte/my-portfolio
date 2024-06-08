import { prismaService, S3Service } from '@/core/core-utils'
import {
  searchProjectsCredentials,
  SearchProjectsGateway,
  searchProjectsResponse
} from '@/core/project/domain'

export class SearchProjectsAdapterV1 extends SearchProjectsGateway {
  async execute({
    search,
    createdAt,
    stacksId,
    technologiesId
  }: searchProjectsCredentials): Promise<searchProjectsResponse> {
    try {
      const projects = await prismaService.project.findMany({
        include: {
          media: true,
          ProjectTechnology: {
            include: { technology: { include: { media: true, Stack: true } } }
          }
        },
        where: {
          createdAt,
          name: { contains: search },
          ProjectTechnology: {
            some: {
              technology: { Stack: { id: { in: stacksId } } },
              technologyId: { in: technologiesId }
            }
          }
        }
      })

      const files = await S3Service.getFiles(
        projects.map((project) => project.media.key)
      )

      return {
        projects: projects.map((project, index) => {
          return {
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
            imageAccess: {
              url: files[index].response,
              expiration: new Date(Date.now() + files[index].expiration * 1000)
            },
            createdAt: project.createdAt,
            updatedAt: project.updatedAt
          }
        })
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
