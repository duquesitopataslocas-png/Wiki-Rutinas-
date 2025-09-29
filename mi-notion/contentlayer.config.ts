import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { z } from 'zod'

const rutinaFrontmatter = z.object({
  title: z.string(),
  semanas: z.number(),
  dias: z.number(),
  objetivo: z.enum(['Fuerza', 'Hipertrofia', 'SL', 'Rehab']),
  rpeObjetivo: z.string(),
  deloadSemana: z.number().optional()
})

export const Rutina = defineDocumentType(() => ({
  name: 'Rutina',
  filePathPattern: `rutinas/**/*.mdx`,
  contentType: 'mdx',
  schema: rutinaFrontmatter,
  fields: {
    title: { type: 'string', required: true },
    semanas: { type: 'number', required: true },
    dias: { type: 'number', required: true },
    objetivo: {
      type: 'enum',
      options: ['Fuerza', 'Hipertrofia', 'SL', 'Rehab'],
      required: true
    },
    rpeObjetivo: { type: 'string', required: true },
    deloadSemana: { type: 'number' }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/rutinas/${doc._raw.flattenedPath}`
    }
  }
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Rutina],
  contentDirExclude: ['**/_*.json']
})
