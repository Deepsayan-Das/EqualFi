export const RECLAIM_CONFIG = {
  APP_ID: process.env.NEXT_PUBLIC_RECLAIM_APP_ID,
  APP_SECRET: process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET,

  // Define providers here. Add new ones easily.
  PROVIDERS: {
    UPWORK: {
      providerId: '61bddce0-fb71-45fc-8309-e2f447c12d5a', // Correct UUID from Dashboard
      label: 'Verify Upwork Income',
      icon: 'Briefcase', // You can map this to Lucide icons
      context: 'Gig Economy Verification'
    },
    UBER: {
      providerId: 'uber-driver',
      label: 'Verify Uber Earnings',
      icon: 'Car',
      context: 'Gig Economy Verification'
    }
  }
}
