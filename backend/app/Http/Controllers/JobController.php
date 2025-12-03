<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    // GET ALL JOBS
    public function index(Request $request)
    {
        $query = Job::query();

        if ($keyword = $request->query('keyword')) {
            $query->where('title', 'like', "%{$keyword}%")
                  ->orWhere('description', 'like', "%{$keyword}%");
        }

        
        if ($location = $request->query('location')) {
            $query->where('location', $location);
        }

        $jobs = $query->with('employer')->latest()->paginate(10);

        return response()->json($jobs);
    }

    //GET SINGLE JOB
    public function show($id)
    {
        $job = Job::with('employer')->findOrFail($id);
        return response()->json($job);
    }

    //CREATE JOB
    public function store(Request $request)
    {

        if (auth()->user()->role !== 'employer') {
            return response()->json(['error' => 'Only employers can post jobs'], 403);
        }

        $fields = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'location' => 'nullable|string', 
            'job_type' => 'nullable|string', 
        ]);

       
        $fields['employer_id'] = auth()->id();

        $job = Job::create($fields);

        return response()->json($job, 201);
    }

    //UPDATE JOB
    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        
        if ($job->employer_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $job->update($request->all());
        return response()->json($job);
    }

    //DELETE JOB
    public function destroy($id)
    {
        $job = Job::findOrFail($id);

        if ($job->employer_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $job->delete();
        return response()->json(['message' => 'Job deleted']);
    }
}