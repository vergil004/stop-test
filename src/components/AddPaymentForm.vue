<template>
  <form class="add-payment" novalidate="true" @submit.prevent="submitForm">
    <div class="add-payment__cont">
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Клиент</div>
        <input
          type="text"
          v-model="client"
          @blur="v$.client.$touch"
          :class="{ invalid: v$.client.$dirty && v$.client.required.$invalid }"
        />
      </div>
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Договор №</div>
        <input
          type="text"
          v-model="contract"
          @blur="v$.contract.$touch"
          :class="{
            invalid: v$.contract.$dirty && v$.contract.required.$invalid,
          }"
        />
      </div>
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Тип Оплаты</div>
        <select
          name="type"
          id="type"
          v-model="type"
          class="form-select"
          @blur="v$.type.$touch"
          :class="{ invalid: v$.type.$dirty && v$.type.required.$invalid }"
        >
          <option value="Не выбрано" selected>Не выбрано</option>
          <option v-for="type in types" :key="type.id" :value="type.id">
            {{ type.title }}
          </option>
        </select>
      </div>
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Дата Оплаты</div>
        <div :class="{ invalid: v$.date.$dirty && v$.date.required.$invalid }">
          <datepicker v-model="date" typeable placeholder="гггг.мм.дд" />
        </div>
      </div>
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Сумма оплаты</div>
        <input
          type="text"
          v-model="sum"
          @blur="v$.sum.$touch"
          :class="{ invalid: v$.sum.$dirty && v$.sum.required.$invalid }"
        />
      </div>
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Статус</div>
        <select
          name="status"
          id="status"
          v-model="statusForm"
          class="form-select"
          @blur="v$.statusForm.$touch"
          :class="{
            invalid: v$.statusForm.$dirty && v$.statusForm.required.$invalid,
          }"
        >
          <option :value="statuses[0].id" selected>
            {{ statuses[0].title }}
          </option>
          <option
            v-for="status in statuses.slice(1)"
            :key="status.id"
            :value="status.id"
          >
            {{ status.title }}
          </option>
        </select>
      </div>
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Тип Источника</div>
        <select
          name="sources"
          id="sources"
          v-model="source"
          class="form-select"
          @blur="v$.source.$touch"
          :class="{
            invalid: v$.source.$dirty && v$.source.required.$invalid,
          }"
        >
          <option value="Не выбрано" selected>Не выбрано</option>
          <option v-for="item in sources" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>
    </div>
    <div class="add-payment__control">
      <button class="btn btn-secondary" @click="cancelForm">Отменить</button>
      <button class="btn btn-primary" type="submit">Добавить оплату</button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Datepicker from "vue3-datepicker";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Datepicker,
  },
  data: () => ({
    client: "",
    contract: "",
    type: "",
    statusForm: "",
    date: null,
    sum: "",
    source: "",
  }),
  validations() {
    return {
      client: { required },
      contract: { required },
      type: { required },
      statusForm: { required },
      date: { required },
      sum: { required },
      source: { required },
    };
  },
  computed: {
    ...mapState({
      types: (state) => state.payments.paymentsTypes,
      statuses: (state) => state.payments.paymentsStatuses,
      sources: (state) => state.payments.paymentsSources,
    }),
  },
  methods: {
    ...mapActions({
      setNewPayment: "setNewPayment",
    }),
    async submitForm() {
      const result = await this.v$.$validate();
      if (result) {
        this.setNewPayment({
          client: this.client,
          contract: this.contract,
          type: this.type,
          status: this.statusForm,
          date: this.date,
          sum: this.sum,
          source: this.source,
        });
        this.cancelForm();
      }
    },
    cancelForm() {
      this.client = "";
      this.contract = "";
      this.type = "";
      this.statusForm = "";
      this.date = null;
      this.sum = "";
      this.source = "";
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped lang="scss">
.add-payment {
  width: 500px;
  &__control {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  &__cont {
    display: grid;
    gap: 16px;
    border-top: 1px solid rgb(222, 226, 230);
    border-bottom: 1px solid rgb(222, 226, 230);
    padding: 30px 20px;
  }
  &__item {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    align-items: center;
    sup {
      color: #f00;
    }
    input {
      width: 250px;
      height: 38px;
      border-radius: 5px;
      border: 1px solid rgb(222, 226, 230);
      padding: 0 16px;
    }
    .invalid {
      border-color: #f00;
      ::v-deep {
        .v3dp__input_wrapper {
          input {
            border-color: #f00;
          }
        }
      }
    }
    select {
      width: 250px;
    }
    ::v-deep {
      .v3dp__input_wrapper {
        position: relative;
        &:after {
          content: "";
          display: block;
          width: 16px;
          height: 16px;
          background-image: url("../assets/img/icons/calendar.svg");
          position: absolute;
          top: 10px;
          right: 10px;
          background-size: 16px;
        }
        input {
          width: 250px;
          height: 38px;
          border-radius: 5px;
          border: 1px solid rgb(222, 226, 230);
          padding: 0 16px;
        }
      }
    }
  }
}
</style>
