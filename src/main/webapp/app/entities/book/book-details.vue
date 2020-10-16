<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="book">
                <h2 class="jh-entity-heading"><span v-text="$t('libraryApp.book.detail.title')">Book</span> {{book.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('libraryApp.book.isbn')">Isbn</span>
                    </dt>
                    <dd>
                        <span>{{book.isbn}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.book.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{book.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.book.publishYear')">Publish Year</span>
                    </dt>
                    <dd>
                        <span>{{book.publishYear}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.book.copies')">Copies</span>
                    </dt>
                    <dd>
                        <span>{{book.copies}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.book.cover')">Cover</span>
                    </dt>
                    <dd>
                        <div v-if="book.cover">
                            <a v-on:click="openFile(book.coverContentType, book.cover)">
                                <img v-bind:src="'data:' + book.coverContentType + ';base64,' + book.cover" style="max-width: 100%;" alt="book image"/>
                            </a>
                            {{book.coverContentType}}, {{byteSize(book.cover)}}
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.book.publisher')">Publisher</span>
                    </dt>
                    <dd>
                        <div v-if="book.publisher">
                            <router-link :to="{name: 'PublisherView', params: {publisherId: book.publisher.id}}">{{book.publisher.name}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('libraryApp.book.author')">Author</span>
                    </dt>
                    <dd>
                        <span v-for="(author, i) in book.authors" :key="author.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'AuthorView', params: {authorId: author.id}}">{{author.firstName}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="book.id" :to="{name: 'BookEdit', params: {bookId: book.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./book-details.component.ts">
</script>
