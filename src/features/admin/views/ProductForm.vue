<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { onMounted, ref } from 'vue'
import {
  addProduct,
  editProduct,
  getProduct,
} from '../../../shared/services/product.service'
import type {
  ProductFormInterface,
  ProductInterface,
} from '../../../interfaces/Product.interface'
import { useRoute, useRouter } from 'vue-router'

const firstInput = ref<HTMLInputElement | null>(null)
const product = ref<ProductInterface | null>(null)

const route = useRoute()
const router = useRouter()

if (route.params.productId) {
  product.value = await getProduct(route.params.productId as string)
}

const initialValues = {
  title: product.value ? product.value.title : '',
  image: product.value ? product.value.image : '',
  price: product.value ? product.value.price : 0,
  description: product.value ? product.value.description : '',
  category: product.value ? product.value.category : 'gamer',
}

onMounted(() => {
  firstInput.value?.focus()
})

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
  initialValues,
})

const title = useField('title')
const image = useField('image')
const price = useField('price')
const description = useField('description')
const category = useField('category')

const trySubmit = handleSubmit(async formValues => {
  try {
    if (!product.value) {
      await addProduct(formValues as ProductFormInterface)
    } else {
      await editProduct(product.value._id, formValues as ProductFormInterface)
    }
    router.push('/admin/productlist')
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div class="card">
    <h3 class="mb-10">
      {{ product ? 'Modify product' : 'Create product' }}
    </h3>
    <form @submit="trySubmit">
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Titre</label>
        <input ref="firstInput" v-model="title.value.value" type="text" />
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
          <option value="desktop">Desktop</option>
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
