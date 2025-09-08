# API Integration Testing Guide

This document outlines the testing procedures to verify that all API integrations are working correctly across the three applications.

## Customer Application API Tests

### Authentication & User Management
- [ ] POST /auth/request-otp - Request OTP for phone number
- [ ] POST /auth/verify-otp - Verify OTP and receive JWT token
- [ ] POST /auth/register - Register new customer
- [ ] GET /auth/profile - Fetch customer profile
- [ ] PUT /auth/profile - Update customer profile
- [ ] POST /auth/logout - Logout and invalidate token

### Services & Categories
- [ ] GET /services - List all available services
- [ ] GET /services/{id} - Get specific service details

### Job Booking
- [ ] POST /jobs/create - Create new job booking
- [ ] GET /jobs/{id} - Fetch job details
- [ ] PUT /jobs/{id}/cancel - Cancel booking
- [ ] GET /jobs/customer/history - Get customer job history

### Ratings
- [ ] POST /ratings - Submit rating for completed job

## Worker Application API Tests

### Authentication & Registration
- [ ] POST /auth/request-otp - Request OTP for phone number
- [ ] POST /auth/verify-otp - Verify OTP and receive JWT token
- [ ] POST /worker/register - Register new worker with skills
- [ ] GET /auth/profile - Fetch worker profile
- [ ] PUT /worker/profile - Update worker profile and skills
- [ ] POST /auth/logout - Logout and invalidate token

### Worker Verification & KYC
- [ ] POST /worker/upload-docs - Upload ID and photo documents
- [ ] GET /worker/status - Check verification status

### Job Handling
- [ ] GET /jobs/available - List available jobs nearby
- [ ] POST /jobs/{id}/accept - Accept job assignment
- [ ] POST /jobs/{id}/reject - Reject job assignment
- [ ] POST /jobs/{id}/status - Update job status
- [ ] GET /jobs/worker/history - Get worker job history

### Payment & Wallet
- [ ] GET /worker/earnings - Get worker earnings history
- [ ] GET /worker/wallet - Get wallet balance
- [ ] POST /worker/wallet/withdraw - Request withdrawal

## Admin Panel API Tests

### Authentication
- [ ] POST /auth/login - Admin login with credentials
- [ ] GET /auth/profile - Fetch admin profile
- [ ] POST /auth/logout - Admin logout

### Worker Management
- [ ] GET /admin/workers - List all workers with filters
- [ ] PUT /admin/workers/{id}/verify - Verify or reject worker

### Job Management
- [ ] GET /admin/jobs - List all jobs
- [ ] PUT /admin/jobs/{id}/reassign - Reassign job to different worker

### Payment Management
- [ ] GET /admin/payments - Monitor all transactions

### Analytics & Reporting
- [ ] GET /admin/analytics - Get platform analytics
- [ ] GET /admin/audit-logs - Get audit logs

### Service Management
- [ ] GET /services - List all services (Admin)
- [ ] POST /services - Add new service (Admin)
- [ ] PUT /services/{id} - Update existing service (Admin)

## Testing Procedures

### 1. Setup
1. Ensure backend API server is running
2. Verify API base URL is correctly configured in all applications
3. Ensure all required environment variables are set

### 2. Customer Application Testing
1. Navigate to customer app login page
2. Request OTP for a valid phone number
3. Verify OTP and check token storage
4. Register as new customer
5. Browse services and book a job
6. Check job history in dashboard
7. Update profile information
8. Logout and verify token removal

### 3. Worker Application Testing
1. Navigate to worker app login page
2. Request OTP for a valid phone number
3. Verify OTP and check token storage
4. Register as new worker with skills
5. Check available jobs and accept one
6. Update job status through completion
7. Check earnings and wallet balance
8. Update profile and skills
9. Logout and verify token removal

### 4. Admin Panel Testing
1. Navigate to admin login page
2. Login with admin credentials
3. View workers list and verify worker
4. View jobs list and reassign a job
5. Check payments and analytics
6. Add/update services
7. Logout and verify token removal

## Common Issues to Watch For

1. **CORS Errors** - Ensure backend has proper CORS configuration
2. **Token Expiration** - Test expired token handling
3. **Network Errors** - Test offline scenarios and error handling
4. **Data Validation** - Test invalid input handling
5. **Rate Limiting** - Test API rate limiting responses
6. **Authentication** - Test unauthorized access attempts

## Test Results

| API Endpoint | Status | Notes |
|--------------|--------|-------|
| POST /auth/request-otp |  |  |
| POST /auth/verify-otp |  |  |
| POST /auth/register |  |  |
| GET /auth/profile |  |  |
| PUT /auth/profile |  |  |
| POST /auth/logout |  |  |
| GET /services |  |  |
| GET /services/{id} |  |  |
| POST /jobs/create |  |  |
| GET /jobs/{id} |  |  |
| PUT /jobs/{id}/cancel |  |  |
| GET /jobs/customer/history |  |  |
| POST /ratings |  |  |
| POST /worker/register |  |  |
| PUT /worker/profile |  |  |
| GET /jobs/available |  |  |
| POST /jobs/{id}/accept |  |  |
| POST /jobs/{id}/reject |  |  |
| POST /jobs/{id}/status |  |  |
| GET /jobs/worker/history |  |  |
| GET /worker/earnings |  |  |
| GET /worker/wallet |  |  |
| POST /worker/wallet/withdraw |  |  |
| POST /auth/login (Admin) |  |  |
| GET /admin/workers |  |  |
| PUT /admin/workers/{id}/verify |  |  |
| GET /admin/jobs |  |  |
| PUT /admin/jobs/{id}/reassign |  |  |
| GET /admin/payments |  |  |
| GET /admin/analytics |  |  |
| POST /services (Admin) |  |  |
| PUT /services/{id} (Admin) |  |  |

## Conclusion

After completing all tests, verify that:
1. All API calls return expected responses
2. Error handling works correctly for failed requests
3. Authentication and authorization are properly enforced
4. Data is correctly displayed and updated in the UI
5. All user flows work as expected