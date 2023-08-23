<template>
  <form class="add-payment" novalidate="true">
    <div class="add-payment__cont">
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Клиент</div>
        <input type="text" v-model="form.client" />
      </div>
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Договор №</div>
        <input type="text" v-model="form.contract" />
      </div>
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Тип Оплаты</div>
        <select name="type" id="type" v-model="form.type" class="form-select">
          <option value="Не выбрано" selected>Не выбрано</option>
          <option v-for="type in types" :key="type.id" :value="type.id">
            {{ type.title }}
          </option>
        </select>
      </div>
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Дата Оплаты</div>
        <datepicker v-model="form.date" typeable placeholder="гггг.мм.дд" />
      </div>
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Сумма оплаты</div>
        <input type="text" />
      </div>
      <div class="add-payment__item">
        <div class="add-payment__label"><sup>*</sup> Статус</div>
        <select
          name="status"
          id="status"
          v-model="form.status"
          class="form-select"
        >
          <option value="statuses[0].id" selected>
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
    </div>
    <div class="add-payment__control">
      <button class="btn btn-secondary">Отменить</button>
      <button class="btn btn-primary">Добавить оплату</button>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import Datepicker from "vue3-datepicker";

export default {
  components: {
    Datepicker,
  },
  data: () => ({
    form: {
      client: "",
      contract: "",
      type: "Не выбрано",
      status: "Не оплачено",
      date: null,
      sum: "",
    },
  }),
  computed: {
    ...mapState({
      types: (state) => state.payments.paymentsTypes,
      statuses: (state) => state.payments.paymentsStatuses,
    }),
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
