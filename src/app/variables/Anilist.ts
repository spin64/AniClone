export const url = 'https://graphql.anilist.co'
export const query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String, $type: MediaType) {
    Page (page: $page, perPage: $perPage) {
    pageInfo {
        currentPage
        hasNextPage
    }
    media (id: $id, search: $search, type: $type, isAdult: false) {
        id
        title {
        romaji
        english
        native
        }
        format
        episodes
        chapters
        description
        coverImage {
        large
        medium
        }
        genres
    }
  }
}
`;