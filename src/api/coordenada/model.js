import mongoose, { Schema } from 'mongoose'

const coordenadaSchema = new Schema({
  longitude: {
    type: String
  },
  latitude: {
    type: String
  },
  precisao: {
    type: String
  },
  id_area_elemento: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

coordenadaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      longitude: this.longitude,
      latitude: this.latitude,
      precisao: this.precisao,
      id_area_elemento: this.id_area_elemento,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Coordenada', coordenadaSchema)

export const schema = model.schema
export default model
