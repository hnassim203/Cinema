import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservations: {}, 
};

const seatSlice = createSlice({
  name: "seats",
  initialState,

  reducers: {
    toggleSeat: (state, action) => {
      const { filmId, seat } = action.payload;

      if (!state.reservations[filmId]) {
        state.reservations[filmId] = [];
      }

      const seats = state.reservations[filmId];
      const exists = seats.find((s) => s.id === seat.id);

      if (exists) {
        state.reservations[filmId] = seats.filter(
          (s) => s.id !== seat.id
        );
      } else {
        state.reservations[filmId].push(seat);
      }
    },

    // تفعيل وتحديث الدالة هنا لتصفير المقاعد بعد الدفع
    clearFilmSeats: (state, action) => {
      const filmId = action.payload; 
      state.reservations[filmId] = []; // تم تعيينها كمصفوفة فارغة لتجنب أخطاء الـ undefined
    },
  },
});

export const { toggleSeat, clearFilmSeats } = seatSlice.actions;
export default seatSlice.reducer;

// إعداد الـ Store الخاص بك في أسفل الملف بشكل نظيف
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    seats: seatSlice.reducer,
  },
});