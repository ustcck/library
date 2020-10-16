<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('libraryApp.book.home.title')" id="book-heading">Books</span>
            <router-link :to="{name: 'BookCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-book">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('libraryApp.book.home.createLabel')">
                    Create a new Book
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
        <div class="alert alert-warning" v-if="!isFetching && books && books.length === 0">
            <span v-text="$t('libraryApp.book.home.notFound')">No books found</span>
        </div>
        <div class="table-responsive" v-if="books && books.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('isbn')"><span v-text="$t('libraryApp.book.isbn')">Isbn</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'isbn'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('name')"><span v-text="$t('libraryApp.book.name')">Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('publishYear')"><span v-text="$t('libraryApp.book.publishYear')">Publish Year</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'publishYear'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('copies')"><span v-text="$t('libraryApp.book.copies')">Copies</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'copies'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('cover')"><span v-text="$t('libraryApp.book.cover')">Cover</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'cover'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('publisher.name')"><span v-text="$t('libraryApp.book.publisher')">Publisher</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'publisher.name'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="book in books"
                    :key="book.id">
                    <td>
                        <router-link :to="{name: 'BookView', params: {bookId: book.id}}">{{book.id}}</router-link>
                    </td>
                    <td>{{book.isbn}}</td>
                    <td>{{book.name}}</td>
                    <td>{{book.publishYear}}</td>
                    <td>{{book.copies}}</td>
                    <td>
                        <a v-if="book.cover" v-on:click="openFile(book.coverContentType, book.cover)">
                            <img v-bind:src="'data:' + book.coverContentType + ';base64,' + book.cover" style="max-height: 30px;" alt="book image"/>
                        </a>
                        <span v-if="book.cover">{{book.coverContentType}}, {{byteSize(book.cover)}}</span>
                    </td>
                    <td>
                        <div v-if="book.publisher">
                            <router-link :to="{name: 'PublisherView', params: {publisherId: book.publisher.id}}">{{book.publisher.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BookView', params: {bookId: book.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'BookEdit', params: {bookId: book.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(book)"
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
            <span slot="modal-title"><span id="libraryApp.book.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-book-heading" v-text="$t('libraryApp.book.delete.question', {'id': removeId})">Are you sure you want to delete this Book?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-book" v-text="$t('entity.action.delete')" v-on:click="removeBook()">Delete</button>
            </div>
        </b-modal>
        <div v-show="books && books.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./book.component.ts">
</script>
