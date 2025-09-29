#!/usr/bin/env node
import { run } from '@contentlayer/cli'

run().catch((error) => {
  if (
    error?.code === 'ERR_INVALID_ARG_TYPE' &&
    typeof error.message === 'string' &&
    error.message.includes('The "code" argument must be of type number')
  ) {
    process.exit(0)
  }

  console.error(error)
  process.exit(1)
})
