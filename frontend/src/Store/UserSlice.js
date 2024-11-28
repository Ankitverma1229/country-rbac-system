import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: null,
    email: null,
    role: null,
    country: null,
    image: null,
    selectedCountry: null,
    isModalOpen: false,
    isNewEntry: false,
    refreshTable: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            const { email, name, role, country, image } = action.payload;
            state.email = email;
            state.name = name;
            state.role = role;
            state.country = country;
            state.image = image;
        },
        clearUserDetails: (state) => {
            state.email = null;
            state.name = null;
            state.role = null;
            state.country = null;
            state.image = null;
        },
        setSelectedCountry: (state, action) => {
            state.selectedCountry = action.payload;
        },
        clearSelectedCountry: (state) => {
            state.selectedCountry = null;
        },
        setModalState: (state, action) => {
            state.isModalOpen = action.payload;
        },
        setNewEntryState: (state, action) => {
            state.isNewEntry = action.payload;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
        resetNewEntryState: (state) => {
            state.isNewEntry = false;
        },
        triggerTableRefresh: (state) => {
            state.refreshTable = !state.refreshTable; // Toggle the value
          },
    },
});

export const { 
    setUserDetails, 
    clearUserDetails, 
    setSelectedCountry, 
    clearSelectedCountry, 
    setModalState, 
    setNewEntryState, 
    closeModal, 
    resetNewEntryState ,
    triggerTableRefresh
} = userSlice.actions;

export default userSlice.reducer;
