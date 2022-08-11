<template>
  <q-item class="q-px-sm" clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar icon="place" color="grey" text-color="white" />
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{
        placeInformation.address.freeformAddress
      }}</q-item-label>
      <q-item-label caption>{{
        placeInformation.address.localName
      }}</q-item-label>
    </q-item-section>

    <div class="column items-center col-auto q-pl-md" side top>
      <q-icon name="send" color="green" />
      <div class="col row items-center q-gutter-x-xs">
        <q-icon name="star" size="20" />
        <q-item-label caption>{{
          placeInformation.score.toFixed(2)
        }}</q-item-label>
      </div>
    </div>
  </q-item>
</template>

<script lang="ts">
export default {
  setup(props: { placeInformation: {} }) {
    const placeInformation = props?.placeInformation;
    return {
      placeInformation,
    };
  },
  props: ["placeInformation"],
};
</script>

<style></style>
