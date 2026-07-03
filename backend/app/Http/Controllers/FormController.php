<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Newsletter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    public function submitContact(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $contact = Contact::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Thank you for contacting us. Your red-carpet invite request has been received.',
            'data' => $contact,
        ], 201);
    }

    public function subscribeNewsletter(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:newsletters,email|max:255',
        ], [
            'email.unique' => 'This email is already subscribed to our premiere newsletter.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $newsletter = Newsletter::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Welcome to the inner circle. You have successfully subscribed to Lumière Premiere.',
            'data' => $newsletter,
        ], 201);
    }
}
