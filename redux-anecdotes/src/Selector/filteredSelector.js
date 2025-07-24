import { createSelector } from "@reduxjs/toolkit";

const filteredAnecdotes = createSelector(
    [state => state.anecdotes, state => state.filter],
    (anecdotes, filtered) => {
        const filterToLower = filtered.toLowerCase()
        return anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().includes(filterToLower))
            .sort((a, b) => b.votes - a.votes);
    }
)

export default filteredAnecdotes;