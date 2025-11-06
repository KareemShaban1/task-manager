-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  from_time TIME,
  to_time TIME,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no authentication mentioned)
CREATE POLICY "Allow public read access to projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to projects"
  ON public.projects FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access to projects"
  ON public.projects FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete access to projects"
  ON public.projects FOR DELETE
  USING (true);

CREATE POLICY "Allow public read access to tasks"
  ON public.tasks FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to tasks"
  ON public.tasks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access to tasks"
  ON public.tasks FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete access to tasks"
  ON public.tasks FOR DELETE
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();