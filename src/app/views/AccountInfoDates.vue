<template>
  <div class="date-info">
    <p class="date-paragraph">
      Created:
      <BaseIcon icon="calendar-alt" class="calendar-icon" />
      <time :datetime="account.dates.created">
        {{ account.dates.created }}
      </time>
    </p>
    <p class="date-paragraph">
      Modified:
      <BaseIcon icon="calendar-alt" class="calendar-icon" />
      <time :datetime="account.dates.last_modified">
        {{ account.dates.last_modified }}
      </time>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.date {
  &-info {
    height: 80px;
  }

  &-paragraph {
    font-weight: bold;
    font-size: 1.6rem;
    color: $primary-color;
    margin: 1.2rem 0;

    & time {
      font-size: 1.4rem;
      font-family: $josefin-sans;
      color: $secondary-color;
    }
  }
}
</style>
