"""
Scheduling & Queue Microservice (3.3)
Simulated Backend Logic
"""

# -------------------------------
# Mock Database (Aurora Simulation)
# -------------------------------

appointments = [
    {
        "id": 1,
        "name": "Sarah Johnson",
        "date": "2025-12-15",
        "time": "09:00 AM",
        "duration": "30 min",
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Confirmed",
        "mode": "In-Person",
    },
    {
        "id": 2,
        "name": "Michael Chen",
        "date": "2025-12-15",
        "time": "10:00 AM",
        "duration": "45 min",
        "doctorName": "Dr. Priya Sharma",
        "status": "Scheduled",
        "mode": "In-Person",
    },
    {
        "id": 3,
        "name": "Emily Rodriguez",
        "date": "2025-12-16",
        "time": "11:30 AM",
        "duration": "30 min",
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Upcoming",
        "mode": "Video Call",
    },
    {
        "id": 4,
        "name": "David Miller",
        "date": "2025-12-14",
        "time": "12:00 PM",
        "duration": "20 min",
        "doctorName": "Dr. Anjali Mehta",
        "status": "Cancelled",
        "mode": "In-Person",
    },
    {
        "id": 5,
        "name": "Sophia Brown",
        "date": "2025-12-16",
        "time": "09:15 AM",
        "duration": "40 min",
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Confirmed",
        "mode": "Video Call",
    },
    {
        "id": 6,
        "name": "Daniel Wilson",
        "date": "2025-12-17",
        "time": "10:45 AM",
        "duration": "30 min",
        "doctorName": "Dr. Priya Sharma",
        "status": "Upcoming",
        "mode": "In-Person",
    },
    {
        "id": 7,
        "name": "Olivia Martinez",
        "date": "2025-12-15",
        "time": "12:30 PM",
        "duration": "25 min",
        "doctorName": "Dr. Anjali Mehta",
        "status": "Confirmed",
        "mode": "In-Person",
    },
    {
        "id": 8,
        "name": "James Anderson",
        "date": "2025-12-18",
        "time": "02:00 PM",
        "duration": "35 min",
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Upcoming",
        "mode": "Video Call",
    },
    {
        "id": 9,
        "name": "Isabella Thomas",
        "date": "2025-12-14",
        "time": "09:30 AM",
        "duration": "30 min",
        "doctorName": "Dr. Priya Sharma",
        "status": "Confirmed",
        "mode": "In-Person",
    },
    {
        "id": 10,
        "name": "Liam Harris",
        "date": "2025-12-16",
        "time": "11:00 AM",
        "duration": "20 min",
        "doctorName": "Dr. Anjali Mehta",
        "status": "Scheduled",
        "mode": "In-Person",
    },
]

# ----------------------------------
# Query Function (GraphQL Simulation)
# ----------------------------------

def get_appointments(date=None, status=None):
    """
    Simulates a GraphQL query to fetch appointments.

    In production:
    - This query would be resolved by AWS AppSync
    - Data would be fetched from Aurora PostgreSQL
    """

    results = appointments

    if date:
        results = [a for a in results if a["date"] == date]

    if status:
        results = [a for a in results if a["status"] == status]

    return results


# ----------------------------------
# Mutation Function (GraphQL Simulation)
# ----------------------------------

def update_appointment_status(appointment_id, new_status):
    """
    Simulates a GraphQL mutation.

    In production:
    - This would perform a transactional write to Aurora
    - AppSync would trigger a subscription event
    - Connected clients would receive real-time updates
    """

    for a in appointments:
        if a["id"] == appointment_id:
            a["status"] = new_status
            return a

    return None
