<script setup>
/**
 * CREATE TABLE sleep_tracker (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL, -- Reference to users table if multi-user
    entry_date DATE NOT NULL,
    sleep_time TIME,
    wake_time TIME,
    reels_cutoff_time TIME,
    screen_off_time TIME,
    mood_morning VARCHAR(50),
    sleep_quality INT CHECK (sleep_quality BETWEEN 1 AND 5),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
 * 
 */
import { ref } from 'vue';
import supabase from '../supabaseClient.js';

const entryDate = ref('');
const sleepTime = ref('');
const wakeTime = ref('');
const reelsCutoffTime = ref('');
const screenOffTime = ref('');
const moodMorning = ref('');
const sleepQuality = ref(2);
const notes = ref('');

const submitForm = async () => {
  if (sleepTime.value === '' || wakeTime.value === '') {
    alert('Please fill in all required fields.');
    return;
  }
  const formData = {
    entry_date: entryDate.value || new Date().toISOString().split('T')[0], // Default to today if not set
    sleep_time: sleepTime.value !== '' ? sleepTime.value : null,
    wake_time: wakeTime.value !== '' ? wakeTime.value : null,
    screen_off_time: screenOffTime.value !== '' ? screenOffTime.value : (sleepTime.value !== '' ? sleepTime.value : null),
    reels_cutoff_time: reelsCutoffTime.value !== '' ? reelsCutoffTime.value : (screenOffTime.value !== '' ? screenOffTime.value : (sleepTime.value !== '' ? sleepTime.value : null)),
    mood_morning: moodMorning.value || 'Neutral',
    sleep_quality: sleepQuality.value ?? 2, // Default to 2 if not set
    notes: notes.value || '',
  };
  const { data, error } = await supabase
    .from('sleep_tracker')
    .insert([formData]);
  if (error) {
    console.error('Error inserting data:', error);
    alert('Failed to submit data. Please try again.');
  } else {
    console.log('Data submitted successfully:', data);
    alert('Sleep data submitted successfully!');
    // Reset form fields
    entryDate.value = '';
    sleepTime.value = '';
    wakeTime.value = '';
    reelsCutoffTime.value = '';
    screenOffTime.value = '';
    moodMorning.value = '';
    sleepQuality.value = 2;
    notes.value = '';
  }
};



</script>
<template>
  <div class="card-dark page-container">
    <h1>Sleep Tracker</h1>
    <div class="form">
      <div class="form-field">
        <label for="entry_date">Entry Date:</label>
        <input type="date" id="entry_date" v-model="entryDate" />
      </div>

      <div class="form-field">
        <label for="sleep_time">Sleep Time:*</label>
        <input type="time" id="sleep_time" v-model="sleepTime" />
      </div>

      <div class="form-field">
        <label for="wake_time">Wake Time:*</label>
        <input type="time" id="wake_time" v-model="wakeTime" />
      </div>

      <div class="form-field">
        <label for="reels_cutoff_time">Reels Cutoff Time:</label>
        <input type="time" id="reels_cutoff_time" v-model="reelsCutoffTime" />
      </div>

      <div class="form-field">
        <label for="screen_off_time">Screen Off Time:</label>
        <input type="time" id="screen_off_time" v-model="screenOffTime" />
      </div>

      <div class="form-field">
        <label for="mood_morning">Mood in the Morning:</label>
        <input type="text" id="mood_morning" v-model="moodMorning" />
      </div>

      <div class="form-field">
        <label for="sleep_quality">Sleep Quality (1-5): {{ sleepQuality }}</label>
        <input type="range" id="sleep_quality" v-model.number="sleepQuality" min="1" max="5" value="2" />
      </div>

      <div class="form-field">
        <label for="notes">Notes:</label>
        <input type="text" id="notes" v-model="notes"></input>
      </div>

      <button @click.prevent="submitForm">Submit</button>
    </div>
    <router-link class="footer-link" to="/report">Go to Report Page</router-link>
  </div>
</template>

<style scoped>
.form-field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

input[type="time"],
input[type="date"],
input[type="text"],
input[type="number"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

input[type="range"] {
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  outline: none;
  transition: background 0.3s;
  margin: 8px 0;
  accent-color: #4caf50;
  /* For modern browsers */
}

/* Webkit browsers */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #4caf50;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: background 0.3s;
}

input[type="range"]:focus::-webkit-slider-thumb {
  background: #388e3c;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 16px;
  border-radius: 3px;
  background: #e0e0e0;
}

/* Firefox */
input[type="range"]::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #4caf50;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: background 0.3s;
}

input[type="range"]:focus::-moz-range-thumb {
  background: #388e3c;
}

input[type="range"]::-moz-range-track {
  height: 6px;
  border-radius: 3px;
  background: #e0e0e0;
}

/* IE */


button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


button:hover {
  background-color: #45a049;
}
</style>