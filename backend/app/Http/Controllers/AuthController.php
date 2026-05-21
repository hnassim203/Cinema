<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required',
        ]);

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password),
            'terms_accepted' => $request->terms_accepted ?? false
        ]);
         return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ]);
    }


    public function login(Request $request){
        $request->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);

         $user = User::where('email', $request->email)->first();

          if (!$user) {
            return response()->json([
                'message' => 'Email Or Password inccorect'
            ], 404);
        }

       
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email Or Password inccorect'
            ], 401);
        }

         return response()->json([
            'user' => $user,
            'redirect' => $user->role === 'admin' ? '/dashboard' : '/'
        ]);
    }
}
