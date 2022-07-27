var app = Vue.createApp({
    data() {
        return {
            confirmed: false,
            name: "",
            mobile: "",
            appliedCoupon: null,
            couponCode: "",
            coupons: [{
                    code: "100TAKAOFF",
                    discount: 100
                },
                {
                    code: "200TAKAOFF",
                    discount: 200
                }
            ],
            seatStates: {
                sold: {
                    text: "Sold",
                    color: "#ff0000"
                },
                available: {
                    text: "Available",
                    color: "#fff"
                },
                booked: {
                    text: "Booked",
                    color: "gray"
                },
                selected: {
                    text: "Selected",
                    color: "#00ff00"
                },
            },
            seats: [{
                    name: "A1",
                    type: "available",
                    price: 500
                },
                {
                    name: "A2",
                    type: "available",
                    price: 500
                },
                {
                    name: "A3",
                    type: "available",
                    price: 500
                },
                {
                    name: "A4",
                    type: "available",
                    price: 500
                },
                {
                    name: "B1",
                    type: "available",
                    price: 500
                },
                {
                    name: "B2",
                    type: "available",
                    price: 500
                },
                {
                    name: "B3",
                    type: "available",
                    price: 500
                },
                {
                    name: "B4",
                    type: "available",
                    price: 500
                },
                {
                    name: "C1",
                    type: "sold",
                    price: 500
                },
                {
                    name: "C2",
                    type: "sold",
                    price: 500
                },
                {
                    name: "C3",
                    type: "sold",
                    price: 500
                },
                {
                    name: "C4",
                    type: "sold",
                    price: 500
                },
                {
                    name: "D1",
                    type: "available",
                    price: 500
                },
                {
                    name: "D2",
                    type: "available",
                    price: 500
                },
                {
                    name: "D3",
                    type: "available",
                    price: 500
                },
                {
                    name: "D4",
                    type: "available",
                    price: 500
                },
                {
                    name: "E1",
                    type: "available",
                    price: 500
                },
                {
                    name: "E2",
                    type: "available",
                    price: 500
                },
                {
                    name: "E3",
                    type: "booked",
                    price: 500
                },
                {
                    name: "E4",
                    type: "booked",
                    price: 500
                },
                {
                    name: "F1",
                    type: "available",
                    price: 500
                },
                {
                    name: "F2",
                    type: "available",
                    price: 500
                },
                {
                    name: "F3",
                    type: "available",
                    price: 500
                },
                {
                    name: "F4",
                    type: "available",
                    price: 500
                },
            ]
        }
    },
    // Computed property
    computed: {
        selectedSeats() {
            let sc = this.seats.filter((item) => item.type === "selected");
            return sc;
        },
        totalCost() {
            let tc = 0;
            this.selectedSeats.forEach((seat) => {
                tc = tc + seat.price;
            });
            if (this.appliedCoupon != null) {
                tc = tc - this.appliedCoupon.discount;
            }
            return tc;
        }
    },

    // Method
    methods: {
        handleClick(i) {
            let clickedseat = this.seats[i];
            if (clickedseat.type === "sold" || clickedseat.type === "booked") {
                alert("You can not select this seat");
                return
            }

            if (clickedseat.type == "available" && this.selectedSeats.length > 2) {
                alert("You can not select more than 3 seat");
                return
            }
            clickedseat.type = clickedseat.type === "selected" ? "available" : "selected";
        },
        confirm() {
            if (!this.name || !this.mobile) {
                alert("Please enter name and mobile");
                return;
            }
            this.confirmed = true;
        },
        resetData() {
            this.confirmed = false;
            this.name = "";
            this.mobile = "";
            this.appliedCoupon = null;

            this.seats.forEach((seat) => {
                if (seat.type === "selected") {
                    seat.type = "sold";
                }
            });
        }
    },



    // Watcher property
    watch: {
        couponCode(newValue) {
            if (newValue.length === 10) {
                let searchedCoupon = this.coupons.filter((item) => item.code === newValue);

                if (searchedCoupon.length === 1) {
                    this.appliedCoupon = searchedCoupon[0];
                    this.couponCode = "";
                } else {
                    alert("Coupon not valid");
                }
            }
        }
    }

})

app.mount("#app")