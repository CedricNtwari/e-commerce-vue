<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const required = { required_error: 'Must not be empty!' }
const validationSchema = toTypedSchema(
  z.object({
    title: z
      .string(required)
      .min(1, { message: 'Title must have at least one character' })
      .max(20, { message: 'Title must have at least twenty characters' }),
    image: z.string(required),
    price: z
      .number(required)
      .min(0, { message: 'Price must be more than 0€' })
      .max(15000, { message: 'Price must be less than 15000€' }),
    description: z
      .string(required)
      .min(10, { message: 'Description must have at least 10 characters' }),
    category: z.string(required),
  }),
)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
})

const title = useField('title')
const image = useField('image')
const price = useField('price')
const description = useField('description')
const category = useField('category')

const trySubmit = handleSubmit(formValues => {
  console.log(formValues)
})
</script>

<template>
  <div class="card">
    <h3 class="mb-10">Add a product</h3>
    <form @submit="trySubmit">
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Title</label>
        <input v-model="title.value.value" type="text" />
        <small class="form-error" v-if="title.errorMessage.value">{{
          title.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Image</label>
        <input v-model="image.value.value" type="text" />
        <small class="form-error" v-if="image.errorMessage.value">{{
          image.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Price</label>
        <input v-model="price.value.value" type="number" />
        <small class="form-error" v-if="price.errorMessage.value">{{
          price.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Description</label>
        <textarea v-model="description.value.value as string"></textarea>
        <small class="form-error" v-if="description.errorMessage.value">{{
          description.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Category</label>
        <select v-model="category.value.value">
          <option value disabled>Choisissez une catégorie</option>
          <option value="gamer">Game</option>
          <option value="desktop">Dektop</option>
          <option value="streaming">Stream</option>
        </select>
        <small class="form-error" v-if="category.errorMessage.value">{{
          category.errorMessage.value
        }}</small>
      </div>
      <button class="btn btn-primary" :disabled="isSubmitting">Submit</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 500px;
}
</style>
