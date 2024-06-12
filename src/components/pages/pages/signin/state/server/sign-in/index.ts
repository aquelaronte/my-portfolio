import { UserPresentation } from '@/core/user/presentation'
import { useMutation } from '@tanstack/react-query'

export default function useSignInMutation() {
  const userPresentation = new UserPresentation()

  const mutation = useMutation({
    mutationKey: ['signInMutation'],
    mutationFn: userPresentation.signIn.execute
  })

  return mutation
}
