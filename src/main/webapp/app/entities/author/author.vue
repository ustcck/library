<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('libraryApp.author.home.title')" id="author-heading">Authors</span>
            <router-link :to="{name: 'AuthorCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-author">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('libraryApp.author.home.createLabel')">
                    Create a new Author
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && authors && authors.length === 0">
            <span v-text="$t('libraryApp.author.home.notFound')">No authors found</span>
        </div>
        <div class="table-responsive" v-if="authors && authors.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('firstName')"><span v-text="$t('libraryApp.author.firstName')">First Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'firstName'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('lastName')"><span v-text="$t('libraryApp.author.lastName')">Last Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'lastName'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="author in authors"
                    :key="author.id">
                    <td>
                        <router-link :to="{name: 'AuthorView', params: {authorId: author.id}}">{{author.id}}</router-link>
                    </td>
                    <td>{{author.firstName}}</td>
                    <td>{{author.lastName}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'AuthorView', params: {authorId: author.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'AuthorEdit', params: {authorId: author.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(author)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="libraryApp.author.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-author-heading" v-text="$t('libraryApp.author.delete.question', {'id': removeId})">Are you sure you want to delete this Author?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-author" v-text="$t('entity.action.delete')" v-on:click="removeAuthor()">Delete</button>
            </div>
        </b-modal>
        <div v-show="authors && authors.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./author.component.ts">
</script>
