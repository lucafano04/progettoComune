<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import type { Utenti, Richieste } from '../../types';
    import { Button, Card, FloatLabel, InputText, Textarea } from 'primevue';

    defineProps({
        user: {type: Object as () => Ref<Utenti.User | null>, required: true}
    })
    const richieste = ref<Richieste.Richiesta[]>([
        {
            oggetto: 'Richiesta 1',
            testo: 'Testo della richiesta 1',
            dataOra: new Date(),
            risposte: []
        },
        {
            oggetto: 'Richiesta 2',
            testo: 'Testo della richiesta 2',
            dataOra: new Date(),
            risposte: []
        },
        { 
            oggetto: 'Richiesta 3',
            testo: 'Testo della richiesta 3',
            dataOra: new Date(),
            risposte: [
                {
                    oggetto: 'Risposta 1',
                    testo: 'Testo della risposta 1',
                    dataOra: new Date(),
                    risposte: []
                }
            ]
        }
    ]);
    const nuovaRichiesta = ref<Richieste.Richiesta>({oggetto: '', testo: '', dataOra: new Date(), risposte: []});
    async function onSend(){
        richieste.value.push(nuovaRichiesta.value);
        nuovaRichiesta.value = {oggetto: '', testo: '', dataOra: new Date(), risposte: []};
    }
</script>
<template>
    <div class="md:tw-grid tw-w-full tw-gap-4 tw-h-5/6 tw-grid-cols-12 gap-2 tw-grid-rows-2">
        <Card class="tw-flex tw-h-full tw-justify-between tw-items-center tw-flex-col tw-col-span-5 tw-row-span-2" :pt='{body:"tw-grow tw-flex tw-justify-between tw-w-full",content:"tw-grow"}'>
            <template #header>
                <h1 class="tw-text-2xl tw-font-bold tw-text-center tw-col-span-3 tw-text-bold">Nuova Richiesta</h1>
            </template>
            <template #content>
                <span class="tw-h-full">
                    <FloatLabel class="tw-w-full tw-mb-2" variant="on">
                        <label for="oggetto">Oggetto</label>
                        <InputText v-model="nuovaRichiesta.oggetto" class="tw-w-full tw-border-black" id="oggetto" />
                    </FloatLabel>
                    <FloatLabel class="tw-w-full tw-h-2/3" variant="on">
                        <Textarea v-model="nuovaRichiesta.testo" class="tw-w-full tw-h-full tw-border-black" :auto-resize=false style="resize: none;" />
                        <label for="testo">Testo della richiesta</label>
                    </FloatLabel>
                </span>
            </template>
            <template #footer>
                <Button label="Invia" class="tw-w-full" icon="pi pi-send" @click="onSend" />
            </template>
        </Card>
        <Card class="tw-flex tw-justify-between tw-items-center tw-flex-col tw-col-span-7" :pt='{body:"tw-h-full tw-w-full",content:"tw-h-full"}'>
            <template #header>
                <h1 class="tw-text-2xl tw-font-bold tw-text-center tw-col-span-3 tw-text-bold">Richieste con risposta</h1>
            </template>
            <template #content>
                <div class="tw-w-full tw-h-5/6 tw-overflow-y-auto">
                    <div v-for="richiesta in richieste.filter(r => r.risposte.length!==0)" :key="richiesta.oggetto" class="tw-w-full tw-mb-2 tw-grid tw-grid-cols-12 tw-border tw-border-black tw-rounded-lg tw-p-2">
                        <h1 class="tw-col-span-12 tw-text-md tw-font-bold tw-text-bold">{{ richiesta.oggetto }}</h1>
                        <p class="tw-col-span-12 tw-text-xs">{{ richiesta.dataOra.toLocaleDateString() }} - Ultima risposta: {{ richiesta.risposte[0].dataOra.toLocaleDateString() }}</p>
                    </div>
                </div>
            </template>
        </Card>
        <Card class="tw-flex tw-justify-between tw-items-center tw-flex-col tw-col-span-7" :pt='{body:"tw-h-full tw-w-full",content:"tw-h-full"}'>
            <template #header>
                <h1 class="tw-text-2xl tw-font-bold tw-text-center tw-col-span-3 tw-text-bold">Richieste senza risposta</h1>
            </template>
            <template #content>
                <div class="tw-w-full tw-h-5/6 tw-overflow-y-auto">
                    <div v-for="richiesta in richieste.filter(r => r.risposte.length===0)" :key="richiesta.oggetto" class="tw-w-full tw-mb-2 tw-grid tw-grid-cols-12 tw-border tw-border-black tw-rounded-lg tw-p-2">
                        <h1 class="tw-col-span-12 tw-text-md tw-font-bold tw-text-bold">{{ richiesta.oggetto }}</h1>
                        <p class="tw-col-span-12 tw-text-xs">{{ richiesta.dataOra.toLocaleDateString() }}</p>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>