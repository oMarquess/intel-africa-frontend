# Trial Usage Display - Implementation Guide

## Overview
This implementation provides two components for displaying trial usage information in your Intelligence Africa frontend:

1. **TrialUsageBadge** - Compact display for sidebars/headers
2. **TrialUsageCard** - Full-featured card for dedicated pages

## Components Created

### 1. Updated Hook: `use-trial-status.ts`
**Location:** `/hooks/use-trial-status.ts`

**Features:**
- Fetches from `/v1/stt/usage/trial/remaining` endpoint
- Auto-refreshes every 30 seconds
- 5-minute cache for performance
- Returns comprehensive trial data

**Usage:**
```tsx
import { useTrialStatus } from "@/hooks/use-trial-status"

const { data, isLoading, error } = useTrialStatus()
```

**Response Type:**
```typescript
interface TrialStatus {
  user_id: string
  total_hours: number
  used_hours: number
  remaining_hours: number
  remaining_percentage: number
  is_trial_active: boolean
  trial_expires_at: string | null
  last_transcription_at: string | null
  audio_seconds_used: number
  audio_seconds_remaining: number
}
```

---

### 2. TrialUsageBadge Component
**Location:** `/components/trial-usage-badge.tsx`

**Purpose:** Compact trial display for sidebars or headers

**Features:**
- Minimal footprint
- Progress bar with color coding:
  - Green: >50% remaining
  - Yellow: 20-50% remaining
  - Red: <20% remaining
- Auto-hides when trial is exhausted
- Shows hours remaining

**Usage:**
```tsx
import { TrialUsageBadge } from "@/components/trial-usage-badge"

<TrialUsageBadge />
```

**Already Integrated In:**
- ✅ `/app/dashboard/page.tsx` (main dashboard sidebar)

---

### 3. TrialUsageCard Component
**Location:** `/components/trial-usage-card.tsx`

**Purpose:** Full-featured trial usage display

**Features:**
- Detailed progress bar with percentage
- Dual time display (hours + minutes)
- Status indicator (Active/Exhausted)
- Warning messages when low (<20%)
- CTA button when exhausted
- Loading and error states
- Dark mode support

**Usage:**
```tsx
import { TrialUsageCard } from "@/components/trial-usage-card"

<TrialUsageCard />
```

**Recommended Placement:**
- Usage & Reporting page
- Account/Settings page
- Dedicated trial status page

---

## Integration Examples

### Example 1: Add to Usage Page
```tsx
// app/dashboard/usage/page.tsx
import { TrialUsageCard } from "@/components/trial-usage-card"

export default function UsagePage() {
  return (
    <div className="space-y-6">
      {/* Trial Usage Card */}
      <TrialUsageCard />
      
      {/* Existing usage stats */}
      <UsageSummaryCards />
      <UsageChart />
    </div>
  )
}
```

### Example 2: Add to Account Settings
```tsx
// app/dashboard/settings/page.tsx
import { TrialUsageCard } from "@/components/trial-usage-card"

export default function SettingsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        {/* User settings */}
      </div>
      <div>
        <TrialUsageCard />
      </div>
    </div>
  )
}
```

### Example 3: Custom Implementation
```tsx
import { useTrialStatus } from "@/hooks/use-trial-status"

export function CustomTrialDisplay() {
  const { data, isLoading } = useTrialStatus()
  
  if (isLoading || !data) return null
  
  return (
    <div>
      <h3>Trial Status</h3>
      <p>{data.remaining_hours.toFixed(2)} hours remaining</p>
      <p>{data.remaining_percentage.toFixed(1)}% left</p>
    </div>
  )
}
```

---

## Color Coding System

### Progress Bar Colors
- **Green (Primary):** >50% remaining - healthy usage
- **Yellow:** 20-50% remaining - warning
- **Red (Destructive):** <20% remaining - critical

### Status Badges
- **🟢 Active:** Trial is active and has remaining time
- **🔴 Exhausted:** Trial has been fully consumed

---

## API Endpoint Configuration

Ensure your `.env.local` has the correct API URL:

```bash
NEXT_PUBLIC_API_URL=https://api.intelligenceafrica.com
```

The hook will call:
```
GET ${NEXT_PUBLIC_API_URL}/v1/stt/usage/trial/remaining
```

---

## Styling & Theming

Both components are built with:
- ✅ shadcn/ui components
- ✅ Tailwind CSS
- ✅ Dark mode support
- ✅ Responsive design

### Customization
You can customize colors by modifying the component files:

```tsx
// Change warning threshold
{remaining_percentage < 30 ? "bg-yellow-500" : "bg-primary"}

// Change text
<CardTitle>Your Custom Title</CardTitle>
```

---

## Performance Considerations

### Caching Strategy
- **Refetch Interval:** 30 seconds (when page is active)
- **Stale Time:** 5 minutes (cache duration)
- **Auto-pause:** Stops refetching when tab is inactive

### Optimization Tips
```tsx
// Disable auto-refetch if needed
const { data } = useTrialStatus({
  refetchInterval: false
})

// Manual refetch
const { refetch } = useTrialStatus()
<Button onClick={() => refetch()}>Refresh</Button>
```

---

## Error Handling

Both components handle errors gracefully:

1. **Loading State:** Shows skeleton loaders
2. **Error State:** Displays error message with retry button
3. **No Data:** Handles missing/null data safely

---

## Testing

### Test Scenarios
1. ✅ Trial with >50% remaining
2. ✅ Trial with 20-50% remaining (yellow warning)
3. ✅ Trial with <20% remaining (red critical)
4. ✅ Exhausted trial (0% remaining)
5. ✅ Loading state
6. ✅ Error state
7. ✅ Dark mode

---

## Next Steps

### Recommended Integrations
1. Add `<TrialUsageCard />` to `/dashboard/usage` page
2. Add warning banner when trial is low
3. Show trial status in user dropdown menu
4. Add trial usage to onboarding flow

### Optional Enhancements
- Email notifications when trial is low
- Push notifications for trial exhaustion
- Trial extension requests
- Usage analytics dashboard

---

## Support

For issues or questions:
1. Check the endpoint is returning correct data
2. Verify environment variables are set
3. Check browser console for errors
4. Ensure Clerk authentication is working
