/** 生成稳定的递增 ID（SSR 安全：不依赖全局随机数）。 */
export function createIdGenerator(prefix = 'feel'): () => string {
  let counter = 0
  return () => {
    counter += 1
    return `${prefix}-${counter.toString(36)}`
  }
}
