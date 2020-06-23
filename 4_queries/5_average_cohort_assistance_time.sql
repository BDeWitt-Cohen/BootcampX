--Need cohorts, ars, will need students because ar isn't associated with cohorts and then average per/cohort


SELECT cohorts.name, AVG((completed_at-started_at)) AS  average_assistance_time 
FROM assistance_requests
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
GROUP BY cohorts.name
ORDER BY average_assistance_time 
