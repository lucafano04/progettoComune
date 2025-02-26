<script setup lang="ts">
    import { Skeleton } from 'primevue';
    import { Dati, Utenti } from '../../../types';

    defineProps({
        zonaSel: String,
        infoGenerali:{ type: Object as () => Dati.DatiGenericiCitta | null, required: false, default: null },
        user: { type: Object as () => Utenti.User | null, required: false, default: null },
        mappaTabella: { type: String, required: false, default: 'mappa' }
    });
</script>

<template>
    <div v-if="zonaSel === ''&&user?.ruolo !=='Analista'" :class="{'tw-rounded tw-p-5 tw-w-full':true, 'lg:tw-w-1/2':mappaTabella === 'mappa', 'lg:tw-w-1/3':mappaTabella === 'tabella'}">
        <div class="tw-grid tw-gap-4 tw-w-9/12 tw-mx-auto">
            <h1 class="tw-text-2xl tw-font-bold tw-text-center tw-col-span-12 tw-text-bold">Trento</h1>
            <div class="tw-flex tw-justify-center tw-col-span-2"> <span class="pi pi-users tw-text-3xl tw-mr-2"></span></div>
            <div class="tw-flex tw-justify-center tw-col-span-4"> Popolazione </div>
            <div v-if="infoGenerali" class="tw-flex tw-justify-center tw-col-span-4"><b>{{ infoGenerali.popolazione }} </b></div>
            <div v-else class="tw-flex tw-justify-center tw-col-span-4"> <Skeleton width="100px" /> </div>
            <div class="tw-col-span-2">abit.</div>
            <div class="tw-flex tw-justify-center tw-col-span-2"> <span class="pi pi-map tw-text-3xl tw-mr-2"></span></div>
            <div class="tw-flex tw-justify-center tw-col-span-4"> Superficie </div>
            <div v-if="infoGenerali" class="tw-flex tw-justify-center tw-col-span-4"><b>{{ infoGenerali.superficie.toFixed(2) }} </b></div>
            <div v-else class="tw-flex tw-justify-center tw-col-span-4"> <Skeleton width="100px" /> </div>
            <div class="tw-col-span-2">km²</div>
            <div class="tw-flex tw-justify-center tw-col-span-2"> <span class="pi pi-history tw-text-3xl tw-mr-2"></span></div>
            <div class="tw-flex tw-justify-center tw-col-span-4">Età media</div>
            <div v-if="infoGenerali" class="tw-flex tw-justify-center tw-col-span-4"><b>{{ infoGenerali.etaMedia.toFixed(2) }}</b></div>
            <div v-else class="tw-flex tw-justify-center tw-col-span-4"> <Skeleton width="100px" /> </div>
            <div class="tw-col-span-2">anni</div>
            <div class="tw-flex tw-justify-center tw-col-span-2"> <span class="pi pi-face-smile tw-text-3xl tw-mr-2"></span></div>
            <div class="tw-flex tw-justify-center tw-col-span-4">Soddisfazione Media</div>
            <div v-if="infoGenerali" class="tw-flex tw-justify-center tw-col-span-4"><b>{{ (infoGenerali.soddisfazioneMedia/5*100).toFixed(2) }}</b></div>
            <div v-else class="tw-flex tw-justify-center tw-col-span-4"> <Skeleton width="100px" /></div>
            <div class="tw-col-span-2">%</div>
        </div>
    </div>
</template>