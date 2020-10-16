<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="client">
                <h2 class="jh-entity-heading"><span v-text="$t('libraryApp.client.detail.title')">Client</span> {{client.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('libraryApp.client.firstName')">First Name</span>
                    </dt>
                    <dd>
                        <span>{{client.firstName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.client.lastName')">Last Name</span>
                    </dt>
                    <dd>
                        <span>{{client.lastName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.client.email')">Email</span>
                    </dt>
                    <dd>
                        <span>{{client.email}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.client.address')">Address</span>
                    </dt>
                    <dd>
                        <span>{{client.address}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.client.phone')">Phone</span>
                    </dt>
                    <dd>
                        <span>{{client.phone}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="client.id" :to="{name: 'ClientEdit', params: {clientId: client.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./client-details.component.ts">
</script>
