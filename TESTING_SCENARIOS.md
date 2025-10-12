# Working Hours E2E Test Scenarios

This document lists all possible scenarios for testing the WorkingHours component with different Google Places API responses.

## Test Scenarios

### 1. **Normal Operating Hours**
**Description:** Standard business with regular hours
**Data:**
- Mon-Fri: 10:00-12:30 / 14:30-20:00
- Sat: 10:00-18:30
- Sun: Closed
- No special days
- Currently open (if within hours)

**Expected Display:**
```
Lunedì – Venerdì: 10:00 – 13:00 / 14:30 – 19:00
Sabato: 10:00 – 18:00
Domenica: Chiuso
```

### 2. **With Special Day (Today)**
**Description:** Special hours for today (e.g., Christmas Eve)
**Data:**
- Regular hours + special day for today
- Special day: Dec 24, 10:00-14:00

**Expected Display:**
- Alert box showing: "Attenzione - Orari speciali:"
- "24 dicembre 2024 - 10:00 – 14:00 (Oggi)"
- Regular hours below

### 3. **With Special Day (Future)**
**Description:** Special hours for a future date
**Data:**
- Regular hours + special day in the future
- Special day: Jan 1, Closed

**Expected Display:**
- Alert box showing upcoming special day
- "1 gennaio 2025 - Chiuso"
- Regular hours below

### 4. **Closed Today (Special Day)**
**Description:** Business closed today for holiday
**Data:**
- Regular hours
- Special day: Today, Closed

**Expected Display:**
- Alert box: "Chiuso (Oggi)"
- Regular hours shown
- "Chiuso ora" status

### 5. **24/7 Operation**
**Description:** Business open 24 hours, 7 days
**Data:**
- All days: 00:00-23:59
- Always open

**Expected Display:**
```
Domenica – Sabato: 00:00 – 23:59
Aperto ora
```

### 6. **Split Days (Different Weekend Hours)**
**Description:** Different hours on different days
**Data:**
- Mon-Wed: 09:00-17:00
- Thu-Fri: 09:00-21:00
- Sat: 10:00-14:00
- Sun: Closed

**Expected Display:**
```
Lunedì – Mercoledì: 09:00 – 17:00
Giovedì – Venerdì: 09:00 – 21:00
Sabato: 10:00 – 14:00
Domenica: Chiuso
```

### 7. **Currently Open**
**Description:** Business currently open
**Data:**
- openNow: true

**Expected Display:**
- "Aperto ora" at bottom

### 8. **Currently Closed**
**Description:** Business currently closed
**Data:**
- openNow: false

**Expected Display:**
- "Chiuso ora" at bottom

### 9. **No Opening Hours Data**
**Description:** API returns empty hours
**Data:**
- Empty periods array

**Expected Display:**
- Fallback to static hours

### 10. **Multiple Split Periods Per Day**
**Description:** Multiple opening/closing periods
**Data:**
- Mon: 06:00-09:00 / 11:00-14:00 / 17:00-22:00

**Expected Display:**
```
Lunedì: 06:00 – 09:00 / 11:00 – 14:00 / 17:00 – 22:00
```

### 11. **Irregular Week Schedule**
**Description:** No pattern in weekly schedule
**Data:**
- Mon: 10:00-18:00
- Tue: Closed
- Wed: 12:00-20:00
- Thu: 10:00-18:00
- Fri: Closed
- Sat: 09:00-13:00
- Sun: Closed

**Expected Display:**
```
Lunedì: 10:00 – 18:00
Martedì: Chiuso
Mercoledì: 12:00 – 20:00
Giovedì: 10:00 – 18:00
Venerdì: Chiuso
Sabato: 09:00 – 13:00
Domenica: Chiuso
```

### 12. **Special Days - Multiple Upcoming**
**Description:** Multiple special days in the future
**Data:**
- Dec 24: 10:00-14:00
- Dec 25: Closed
- Dec 26: Closed
- Jan 1: Closed

**Expected Display:**
- Alert box with all 4 special days listed
- Regular hours below

### 13. **API Error / Fallback**
**Description:** API request fails
**Data:**
- Network error or invalid credentials

**Expected Display:**
- Fallback static hours:
```
Lunedì – Venerdì: 10:00 – 13:00 / 14:30 – 19:00
Sabato: 10:00 – 18:00
Domenica: Chiuso
```

### 14. **Weekend Only Business**
**Description:** Open only on weekends
**Data:**
- Mon-Fri: Closed
- Sat-Sun: 10:00-18:00

**Expected Display:**
```
Domenica: Chiuso
Lunedì – Venerdì: Chiuso
Sabato – Domenica: 10:00 – 18:00
```

### 15. **Late Night Hours (Past Midnight)**
**Description:** Closing time after midnight
**Data:**
- Fri-Sat: 18:00-02:00 (next day)

**Expected Display:**
```
Venerdì – Sabato: 18:00 – 02:00
```
*Note: This may need special handling depending on how Google returns the data*

## Test Data Structures

Each scenario needs mock data in this format:

```typescript
export const mockScenarios = {
  normalHours: {
    regularOpeningHours: {
      periods: [
        { open: { day: 1, hour: 10, minute: 0 }, close: { day: 1, hour: 12, minute: 30 } },
        { open: { day: 1, hour: 15, minute: 30 }, close: { day: 1, hour: 20, minute: 0 } },
        // ... more days
      ],
    },
    currentOpeningHours: {
      openNow: true,
    },
  },
  // ... more scenarios
}
```

## Implementation Checklist

For each scenario, tests should verify:

- [ ] Correct heading text
- [ ] Correct day grouping
- [ ] Correct time formatting
- [ ] Special day alerts appear when expected
- [ ] "Oggi" label appears on today's special day
- [ ] Open/closed status displays correctly
- [ ] Fallback works when API fails
- [ ] No accessibility violations
- [ ] Renders correctly on server (no JS)

## Priority Testing Order

1. **High Priority** (Must test):
   - Normal hours (#1)
   - Special day today (#2)
   - API error/fallback (#13)
   - Currently open/closed (#7, #8)

2. **Medium Priority** (Should test):
   - Special day future (#3)
   - Closed today (#4)
   - Split days (#6)
   - Multiple special days (#12)

3. **Low Priority** (Nice to test):
   - 24/7 operation (#5)
   - Multiple periods (#10)
   - Irregular schedule (#11)
   - Weekend only (#14)
   - Late night (#15)

## Mock API Implementation

For testing, you'll need to:

1. Mock the `fetch` call to Google Places API
2. Return different mock responses per scenario
3. Test both with and without JavaScript enabled
4. Test Schema.org output matches display
