/**
 * Function to get the current environment.
 * @return {T} The current environment variables.
 * @example
 * ```ts
 * const { JIRA_ENV } = loadEnvironmentVariables<Jira>()
 * // Do something with the environment
 * ```
 */
export function loadEnvironmentVariables<T>(): T {
  return process.env as unknown as T;
}
