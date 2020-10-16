<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="borrowedBook">
                <h2 class="jh-entity-heading"><span v-text="$t('libraryApp.borrowedBook.detail.title')">BorrowedBook</span> {{borrowedBook.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('libraryApp.borrowedBook.borrowDate')">Borrow Date</span>
                    </dt>
                    <dd>
                        <span>{{borrowedBook.borrowDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.borrowedBook.book')">Book</span>
                    </dt>
                    <dd>
                        <div v-if="borrowedBook.book">
                            <router-link :to="{name: 'BookView', params: {bookId: borrowedBook.book.id}}">{{borrowedBook.book.name}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.borrowedBook.client')">Client</span>
                    </dt>
                    <dd>
                        <div v-if="borrowedBook.client">
                            <router-link :to="{name: 'ClientView', params: {clientId: borrowedBook.client.id}}">{{borrowedBook.client.email}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="borrowedBook.id" :to="{name: 'BorrowedBookEdit', params: {borrowedBookId: borrowedBook.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./borrowed-book-details.component.ts">
</script>
