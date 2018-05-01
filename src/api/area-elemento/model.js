import mongoose, { Schema } from 'mongoose'

const areaElementoSchema = new Schema({
  id_area: {
    type: String
  },
  id_elemento: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

areaElementoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      id_area: this.id_area,
      id_elemento: this.id_elemento,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('AreaElemento', areaElementoSchema)

export const schema = model.schema
export default model
