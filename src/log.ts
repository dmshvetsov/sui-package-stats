import { inspect } from 'util'

function toString(o: unknown): string {
  return inspect(o, {
    colors: true,
    depth: null,
    maxArrayLength: Infinity,
    maxStringLength: Infinity
  })
}

function toStringLine(o: unknown): string {
  return toString(o) + '\n'
}

function info(o: unknown) {
  console.info(toStringLine(o))
}

function error(o: unknown) {
  console.error(toStringLine(o))
}

export default {
  info,
  error
}
