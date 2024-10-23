import { defineStore } from 'pinia';

export const useTempStore = defineStore('temp', {
    state: () => ({
        business: {},
        user: {},
    }),

    actions: {
        setBusiness(business) {
            this.business = business;
        },
        setUser(user) {
            this.user = user;
        }
    }
});
