<script>
    let see_password = $state(false);
    let sign_in = $state(false);
</script>

<form method="POST">
    <div class="auto h-screen w-full flex-1 flex-col content-center justify-center">
        <h1 class="mb-10 w-full text-center text-5xl font-semibold">Login to Buhay</h1>

        <div class="auto w-full flex-1 flex-col">
            <div class="mb-6 flex w-full justify-center">
                <input
                    name="user"
                    type="text"
                    class="flex w-[250px] rounded-xl selection:bg-blue-neutral selection:text-white focus:bg-blue-white
                                      {sign_in ? 'bg-light-gray' : ''}"
                    placeholder="Username"
                    disabled={sign_in}
                />
            </div>

            <div class="mb-8 flex w-full justify-center">
                <div class="relative">
                    <input
                        name="password"
                        type={see_password ? 'text' : 'password'}
                        class="w-[250px] rounded-xl focus:bg-blue-white
                                                                 {sign_in ? 'bg-light-gray' : ''}"
                        placeholder="Password"
                        disabled={sign_in}
                    />
                    <button
                        onclick={event => {
                            see_password = !see_password;
                            event.preventDefault();
                        }}
                        class="absolute right-4 top-[12px]"
                        disabled={sign_in}
                    >
                        <img
                            src={!see_password
                                ? '../src/lib/icons/eye.svg'
                                : '../src/lib/icons/closed_eye.svg'}
                            alt="show password"
                            class="h-5 w-5"
                        />
                    </button>
                </div>
            </div>

            <div class="flex w-full justify-center">
                <button
                    formaction="?/login"
                    class="rounded-2xl px-6 py-3 text-white
                           active:bg-[#144359] active:font-semibold active:text-white active:drop-shadow-xl active:duration-300
                           {!sign_in
                        ? 'w-[100px] bg-blue-neutral font-medium hover:border-black hover:bg-[#a6dcf5] hover:text-black hover:duration-150'
                        : 'w-[200px bg-[#144359] font-semibold drop-shadow-xl'}"
                    disabled={sign_in}
                    onsubmit={() => {
                        sign_in = !sign_in;
                    }}
                >
                    {!sign_in ? 'Sign In' : 'Signing In'}</button
                >
            </div>
        </div>
    </div>
</form>
