SELECT day, count(*) as number_of_assignments, sum(duration) as duration
FROM assignments
GROUP BY day
ORDER BY day;


/* My solution that provided the same answer
SELECT day, SUM(duration), COUNT(name) AS number_of_assignments
FROM assignments
GROUP BY day
ORDER BY day
*/
