export function initializeAsyncState() {
  return {
    error: undefined,
    value: undefined,
    hasValue: false,
    isLoading: false,
    hasError: false
  }
}

export function initializeAsyncStateLoading() {
  return {
    error: undefined,
    value: undefined,
    hasValue: false,
    isLoading: true,
    hasError: false
  }
}

export function initializeAsyncStateError(error: unknown) {
  return {
    error,
    value: undefined,
    hasValue: false,
    isLoading: false,
    hasError: true
  }
}

export function initializeAsyncStateData<T>(data: T) {
  return {
    error: undefined,
    value: data,
    hasValue: true,
    isLoading: false,
    hasError: false
  }
}
