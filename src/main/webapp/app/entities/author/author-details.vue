<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="author">
                <h2 class="jh-entity-heading"><span v-text="$t('libraryApp.author.detail.title')">Author</span> {{author.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('libraryApp.author.firstName')">First Name</span>
                    </dt>
                    <dd>
                        <span>{{author.firstName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.author.lastName')">Last Name</span>
                    </dt>
                    <dd>
                        <span>{{author.lastName}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="author.id" :to="{name: 'AuthorEdit', params: {authorId: author.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./author-details.component.ts">
</script>
