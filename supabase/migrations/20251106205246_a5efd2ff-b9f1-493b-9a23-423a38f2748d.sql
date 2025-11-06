-- Drop the old time columns and add new date columns
ALTER TABLE public.tasks DROP COLUMN from_time;
ALTER TABLE public.tasks DROP COLUMN to_time;

ALTER TABLE public.tasks ADD COLUMN start_date DATE;
ALTER TABLE public.tasks ADD COLUMN end_date DATE;