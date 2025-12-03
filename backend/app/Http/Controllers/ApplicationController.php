<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Job;

class ApplicationController extends Controller
{
    //APPLY FOR A JOB
    public function store(Request $request)
    {
        
        if (auth()->user()->role !== 'candidate') {
            return response()->json(['error' => 'Only candidates can apply'], 403);
        }

        $request->validate([
            'job_id' => 'required|exists:jobs,id'
        ]);

        
        $exists = Application::where('job_id', $request->job_id)
                            ->where('candidate_id', auth()->id())
                            ->exists();
        
        if($exists) {
            return response()->json(['error' => 'You have already applied for this job'], 400);
        }

        $application = Application::create([
            'job_id' => $request->job_id,
            'candidate_id' => auth()->id(),
            'status' => 'pending'
        ]);

        return response()->json($application, 201);
    }

    //VIEW APPLICANTS FOR JOB
    public function forJob($job_id)
    {
        // Find the job
        $job = Job::findOrFail($job_id);

      
        if ($job->employer_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        
        $applications = $job->applications()->with('candidate')->get();

        return response()->json($applications);
    }

    //MY APPLICATIONS
    public function myApplications()
    {
        $applications = Application::where('candidate_id', auth()->id())
                                   ->with('job.employer') // Load Job and Employer info
                                   ->get();

        return response()->json($applications);
    }
}