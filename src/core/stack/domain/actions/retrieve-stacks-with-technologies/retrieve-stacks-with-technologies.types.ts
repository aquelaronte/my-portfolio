import { TechnologyDomain } from '@/core/technology/domain'
import { StackDomain } from '@/core/stack/domain'

export interface retrieveStacksWithTechnologiesResponse {
  stacks: (StackDomain & { technologies: TechnologyDomain[] })[]
}
