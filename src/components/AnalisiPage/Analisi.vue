<script lang="ts" setup>
    import { Tabs, Tab, TabPanel, TabList, TabPanels, Skeleton } from 'primevue';
    import Chart from 'primevue/chart';
    import { PropType, ref, watch } from 'vue';
    
    import { Quartieri, Circoscrizioni, Dati } from '../../../types';

    import ristoranti from '../../assets/restaurant.svg?raw';
    import scuole from '../../assets/school.svg?raw';
    import areeVerdi from '../../assets/tree.svg?raw';
    import polizia from '../../assets/polizia.svg?raw';
    import incidenti from '../../assets/accidents.svg?raw';
    import localiNotturni from '../../assets/localiNotturni.svg?raw';
    
    const props = defineProps({
        datiZonaSel: { type: [Object, null] as PropType<Quartieri.Quartiere | Circoscrizioni.Circoscrizione | null>, required: true },
        quartCirc: { type: Boolean as PropType<boolean>, required: true },
        zonaSel: {type: String as PropType<string>, required: true},
        infoGenerali: { type: [Object, null] as PropType<Dati.DatiGenericiCitta | null>, required: false }
    });
    const val = ref<string>("0");
    watch(()=>props.zonaSel, (newVal) => {
        if(newVal === ''){
            val.value = "0";
        }
    });
</script>

<template>
    <div class="tw-flex tw-flex-col tw-items-center">
        <h1 class="tw-text-2xl tw-font-bold tw-mb-5">{{ 
            zonaSel ?
                (quartCirc ? 'Circoscrizione ' : 'Quartiere ') + datiZonaSel?.nome
            : 'Citta di Trento'
        }}</h1>
        <div class="tw-border tw-border-gray-300 tw-rounded-lg tw-p-5 tw-mt-5 lg:tw-mt-0">
            
            <Tabs v-model:value="val">
                <TabList>
                    <Tab value="0">Generale</Tab>
                    <Tab value="1" v-if="zonaSel">Demografica</Tab>
                    <Tab value="2" v-if="zonaSel">Servizi</Tab>
                    <Tab value="3" v-if="zonaSel">Sicurezza</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <div class="tw-grid tw-grid-cols-12 tw-align-center tw-gap-2 tw-mb-3">
                            <div class="tw-col-span-12 tw-mb-4">
                                <h2 class="tw-text-xl tw-font-bold tw-m-auto">Informazioni Generali</h2>
                            </div>
                            <span class="pi pi-users tw-text-3xl tw-m-auto"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Popolazione</p>
                            </div>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p v-if="!zonaSel && infoGenerali">
                                    {{ infoGenerali.popolazione }}
                                </p>
                                <p v-else-if="datiZonaSel">
                                    {{ datiZonaSel.popolazione }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <div class="tw-col-span-1 tw-m-auto">
                                <p class="tw-text-sm">abit.</p>
                            </div>
                            <span class="pi pi-map tw-text-3xl tw-m-auto"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Superficie</p>
                            </div>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p v-if="!zonaSel && infoGenerali">
                                    {{ infoGenerali.superficie.toFixed(2) }}
                                </p>
                                <p v-else-if="datiZonaSel">
                                    {{ datiZonaSel.superficie.toFixed(2) }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <div class="tw-col-span-1 tw-m-auto">
                                <p class="tw-text-sm">km²</p>
                            </div>
                            <span class="pi pi-history tw-text-3xl tw-m-auto"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Età media</p>
                            </div>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p v-if="!zonaSel && infoGenerali">
                                    {{ infoGenerali.etaMedia.toFixed(2) }}
                                </p>
                                <p v-else-if="datiZonaSel">
                                    {{ datiZonaSel.etaMedia.toFixed(2) }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <div class="tw-col-span-1 tw-m-auto">
                                <p class="tw-text-sm">anni</p>
                            </div>
                            <span class="pi pi-face-smile tw-text-3xl tw-m-auto"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Soddisfazione media</p>
                            </div>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p v-if="!zonaSel &&  infoGenerali">
                                    {{ infoGenerali.soddisfazioneMedia !== 0 ? ((infoGenerali.soddisfazioneMedia)/5*100).toFixed(2): '0.00' }}
                                </p>
                                <p v-else-if="datiZonaSel">
                                    {{ datiZonaSel.soddisfazioneMedia !== 0 ? ((datiZonaSel.soddisfazioneMedia)/5*100).toFixed(2): '0.00' }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <div class="tw-col-span-1 tw-m-auto">
                                <p class="tw-text-sm">%</p>
                            </div>
                            <span class="pi pi-equals tw-text-3xl tw-m-auto" v-if="zonaSel!==''"></span>
                            <div class="tw-col-span-2 tw-m-auto" v-if="zonaSel!==''">
                                <p class="tw-text-lg tw-font-bold">Servizi Totali</p>
                            </div>
                            <div class="tw-col-span-3 tw-m-auto" v-if="zonaSel!==''">
                                <p v-if="datiZonaSel">
                                    {{ datiZonaSel.servizi.areeVerdi + datiZonaSel.servizi.localiNotturni + datiZonaSel.servizi.scuole + datiZonaSel.servizi.serviziRistorazione }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <!-- Dati demografici (Popolazione, Età Media, Superficie) -->
                        <div class="tw-grid tw-grid-cols-12 tw-align-center tw-gap-2">
                            <div class="tw-col-span-12 tw-mb-4">
                                <h2 class="tw-text-xl tw-font-bold tw-m-auto">Informazioni Demografiche</h2>
                            </div>
                            <span class="pi pi-users tw-text-3xl tw-m-auto"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Popolazione</p>
                            </div>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p v-if="datiZonaSel">
                                    {{ datiZonaSel.popolazione }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <div class="tw-col-span-1 tw-m-auto">
                                <p class="tw-text-sm">abit.</p>
                            </div>
                            <span class="pi pi-map tw-text-3xl tw-m-auto"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Superficie</p>
                            </div>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p v-if="datiZonaSel">
                                    {{ datiZonaSel.superficie.toFixed(2) }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <div class="tw-col-span-1 tw-m-auto">
                                <p class="tw-text-sm ">km²</p>
                            </div>
                            <span class="pi pi-history tw-text-3xl tw-m-auto"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Età media</p>
                            </div>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p v-if="datiZonaSel">
                                    {{ datiZonaSel.etaMedia.toFixed(2) }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <div class="tw-col-span-1 tw-m-auto">
                                <p class="tw-text-sm">anni</p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <!-- Dati Servizi (Numero Totale, Scuole, Aree Verdi, Servizi di Ristorazione, Locali notturni)-->
                        <div class="tw-grid tw-grid-cols-12 tw-align-center tw-gap-2">
                            <div class="tw-col-span-12 tw-mb-4">
                                <h2 class="tw-text-xl tw-font-bold tw-m-auto">Informazioni sui Servizi</h2>
                            </div>
                            <span class="svg-image tw-m-auto" v-html="scuole"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Scuole</p>
                            </div>
                            <div class="tw-col-span-3 tw-m-auto">
                                <p v-if="datiZonaSel">
                                    {{ datiZonaSel.servizi.scuole }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <span class="svg-image tw-m-auto" v-html="areeVerdi"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Aree Verdi</p>
                            </div>
                            <div class="tw-col-span-3 tw-m-auto">
                                <p v-if="datiZonaSel">
                                    {{ datiZonaSel.servizi.areeVerdi }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <span class="svg-image tw-m-auto" v-html="ristoranti"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Servizi di Ristorazione</p>
                            </div>
                            <div class="tw-col-span-3 tw-m-auto">
                                <p v-if="datiZonaSel">
                                    {{ datiZonaSel.servizi.serviziRistorazione }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <span class="svg-image tw-m-auto" v-html="localiNotturni"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Locali Notturni</p>
                            </div>
                            <div class="tw-col-span-3 tw-m-auto">
                                <p v-if="datiZonaSel">
                                    {{ datiZonaSel.servizi.localiNotturni }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="3">
                        <!-- Dati sicurezza (numero interventi, incidenti, tasso di criminalità) -->
                        <div class="tw-grid tw-grid-cols-12 tw-align-center tw-gap-2">
                            <div class="tw-col-span-12 tw-mb-4">
                                <h2 class="tw-text-xl tw-font-bold tw-m-auto">Informazioni sulla Sicurezza</h2>
                            </div>
                            <span class="svg-image tw-m-auto" v-html="polizia"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Numero Interventi</p>
                            </div>
                            <div class="tw-col-span-3 tw-m-auto">
                                <p v-if="datiZonaSel">
                                    {{ datiZonaSel.sicurezza.numeroInterventi }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <div class="tw-col-span-6">
                                <Chart type="line" :data="datiZonaSel!==null ? { 
                                    labels: ['', '', '', '', '', '', '', '', '', ''],
                                    datasets: [
                                        {
                                            label: 'Numero Interventi',
                                            data: [ Math.round((Math.random()*6)*datiZonaSel.sicurezza.numeroInterventi), Math.round((Math.random()*6)*datiZonaSel.sicurezza.numeroInterventi), Math.round((Math.random()*6)*datiZonaSel.sicurezza.numeroInterventi), Math.round((Math.random()*6)*datiZonaSel.sicurezza.numeroInterventi), Math.round((Math.random()*6)*datiZonaSel.sicurezza.numeroInterventi), Math.round((Math.random()*6)*datiZonaSel.sicurezza.numeroInterventi), Math.round((Math.random()*6)*datiZonaSel.sicurezza.numeroInterventi), Math.round((Math.random()*6)*datiZonaSel.sicurezza.numeroInterventi), Math.round((Math.random()*6)*datiZonaSel.sicurezza.numeroInterventi), datiZonaSel.sicurezza.numeroInterventi],
                                            fill: true,
                                            borderColor: '#42A5F5',
                                            tension: 0.6,
                                            xAxisID: 'x',
                                            yAxisID: 'y',
                                        }
                                    ],
                                } : {}" :options="{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scale: { 
                                        x: { 
                                            ticks: { 
                                                type: false,
                                            },
                                            startAtZero: true
                                        },
                                        y: {
                                            ticks: {
                                                type: false,
                                            },
                                            startAtZero: true
                                        },
                                        ticks: {
                                            display: false
                                        }
                                    },
                                    plugins: {
                                        legend: false,
                                        tooltip: true,
                                    },
                                }" />
                            </div>
                            <span class="svg-image tw-m-auto" v-html="incidenti"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Numero Incidenti</p>
                            </div>
                            <div class="tw-col-span-3 tw-m-auto">
                                <p v-if="datiZonaSel">
                                    {{ datiZonaSel.sicurezza.incidenti }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <div class="tw-col-span-6">
                                <Chart type="line" :data="datiZonaSel!==null ? { 
                                    labels: ['', '', '', '', '', '', '', '', '', ''],
                                    datasets: [
                                        {
                                            label: 'Incidenti',
                                            data: [ Math.round((Math.random()*0.40+0.8)*datiZonaSel.sicurezza.incidenti), Math.round((Math.random()*0.40+0.8)*datiZonaSel.sicurezza.incidenti), Math.round((Math.random()*0.40+0.8)*datiZonaSel.sicurezza.incidenti), Math.round((Math.random()*0.40+0.8)*datiZonaSel.sicurezza.incidenti), Math.round((Math.random()*0.40+0.8)*datiZonaSel.sicurezza.incidenti), Math.round((Math.random()*0.40+0.8)*datiZonaSel.sicurezza.incidenti), Math.round((Math.random()*0.40+0.8)*datiZonaSel.sicurezza.incidenti), Math.round((Math.random()*0.40+0.8)*datiZonaSel.sicurezza.incidenti), Math.round((Math.random()*0.40+0.8)*datiZonaSel.sicurezza.incidenti), datiZonaSel.sicurezza.incidenti],
                                            fill: true,
                                            borderColor: '#42A5F5',
                                            tension: 0.6,
                                            xAxisID: 'x',
                                            yAxisID: 'y',
                                        }
                                    ],
                                } : {}" :options="{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scale: { 
                                        x: { 
                                            ticks: { 
                                                type: false,
                                            },
                                            startAtZero: true
                                        },
                                        y: {
                                            ticks: {
                                                type: false,
                                            },
                                            startAtZero: true
                                        },
                                        ticks: {
                                            display: false
                                        }
                                    },
                                    plugins: {
                                        legend: false,
                                        tooltip: true,
                                    },
                                }" />
                            </div>
                            <span class="pi pi-ban tw-text-3xl tw-m-auto"></span>
                            <div class="tw-col-span-2 tw-m-auto">
                                <p class="tw-text-lg tw-font-bold">Tasso di Criminalità</p>
                            </div>
                            <div class="tw-col-span-3 tw-m-auto">
                                <p v-if="datiZonaSel">
                                    {{ datiZonaSel.sicurezza.tassoCriminalita }}
                                </p>
                                <Skeleton v-else width="75px" height="1.5rem"/>
                            </div>
                            <div class="tw-col-span-6">
                                <Chart type="line" :data="datiZonaSel!==null ? { 
                                    labels: ['', '', '', '', '', '', '', '', '', ''],
                                    datasets: [
                                        {
                                            label: 'Tasso di Criminalità',
                                            data: [ (Math.random()*0.40+0.8)*datiZonaSel.sicurezza.tassoCriminalita, (Math.random()*0.40+0.8)*datiZonaSel.sicurezza.tassoCriminalita, (Math.random()*0.40+0.8)*datiZonaSel.sicurezza.tassoCriminalita, (Math.random()*0.40+0.8)*datiZonaSel.sicurezza.tassoCriminalita, (Math.random()*0.40+0.8)*datiZonaSel.sicurezza.tassoCriminalita, (Math.random()*0.40+0.8)*datiZonaSel.sicurezza.tassoCriminalita, (Math.random()*0.40+0.8)*datiZonaSel.sicurezza.tassoCriminalita, (Math.random()*0.40+0.8)*datiZonaSel.sicurezza.tassoCriminalita, (Math.random()*0.40+0.8)*datiZonaSel.sicurezza.tassoCriminalita, datiZonaSel.sicurezza.tassoCriminalita],
                                            fill: true,
                                            borderColor: '#42A5F5',
                                            tension: 0.6,
                                            xAxisID: 'x',
                                            yAxisID: 'y',
                                        }
                                    ],
                                } : {}" :options="{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scale: { 
                                        x: { 
                                            ticks: { 
                                                type: false,
                                            },
                                            startAtZero: true
                                        },
                                        y: {
                                            ticks: {
                                                type: false,
                                            },
                                            startAtZero: true
                                        },
                                        ticks: {
                                            display: false
                                        }
                                    },
                                    plugins: {
                                        legend: false,
                                        tooltip: true,
                                    },
                                }" />
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
</template>