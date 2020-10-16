<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('libraryApp.borrowedBook.home.title')" id="borrowed-book-heading">Borrowed Books</span>
            <router-link :to="{name: 'BorrowedBookCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-borrowed-book">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('libraryApp.borrowedBook.home.createLabel')">
                    Create a new Borrowed Book
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
        <div class="alert alert-warning" v-if="!isFetching && borrowedBooks && borrowedBooks.length === 0">
            <span v-text="$t('libraryApp.borrowedBook.home.notFound')">No borrowedBooks found</span>
        </div>
        <div class="table-responsive" v-if="borrowedBooks && borrowedBooks.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('borrowDate')"><span v-text="$t('libraryApp.borrowedBook.borrowDate')">Borrow Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'borrowDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('book.name')"><span v-text="$t('libraryApp.borrowedBook.book')">Book</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'book.name'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('client.email')"><span v-text="$t('libraryApp.borrowedBook.client')">Client</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'client.email'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="borrowedBook in borrowedBooks"
                    :key="borrowedBook.id">
                    <td>
                        <router-link :to="{name: 'BorrowedBookView', params: {borrowedBookId: borrowedBook.id}}">{{borrowedBook.id}}</router-link>
                    </td>
                    <td>{{borrowedBook.borrowDate}}</td>
                    <td>
                        <div v-if="borrowedBook.book">
                            <router-link :to="{name: 'BookView', params: {bookId: borrowedBook.book.id}}">{{borrowedBook.book.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="borrowedBook.client">
                            <router-link :to="{name: 'ClientView', params: {clientId: borrowedBook.client.id}}">{{borrowedBook.client.email}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BorrowedBookView', params: {borrowedBookId: borrowedBook.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'BorrowedBookEdit', params: {borrowedBookId: borrowedBook.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(borrowedBook)"
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
            <span slot="modal-title"><span id="libraryApp.borrowedBook.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-borrowedBook-heading" v-text="$t('libraryApp.borrowedBook.delete.question', {'id': removeId})">Are you sure you want to delete this Borrowed Book?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-borrowedBook" v-text="$t('entity.action.delete')" v-on:click="removeBorrowedBook()">Delete</button>
            </div>
        </b-modal>
        <div v-show="borrowedBooks && borrowedBooks.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./borrowed-book.component.ts">
</script>
