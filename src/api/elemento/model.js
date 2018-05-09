import mongoose, { Schema } from 'mongoose'

const elementoSchema = new Schema({
  info: {
    type: String
  },
  estado: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

elementoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      info: this.info,
      estado: this.estado,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Elemento', elementoSchema)

export const schema = model.schema
export default model
