<script>
    import { Eye, EyeClosed } from 'lucide-svelte';

    import { enhance } from '$app/forms';

    let { form } = $props();

    let see_password = $state(false);
    let sign_in = $state(false);
</script>

<form
    method="POST"
    use:enhance={() => {
        sign_in = !sign_in;
        if (form != null) form = null;
        return async ({ result, update }) => {
            update();
            if (result.type != 'redirect') sign_in = false;
        };
    }}
>
    <div class="auto h-screen w-full flex-1 flex-col content-center justify-center">
        <h1 class="mb-10 w-full text-center text-5xl font-semibold">Login to Buhay</h1>

        <div class="auto w-full flex-1 flex-col">
            <div class="mb-6 flex w-full justify-center">
                <input
                    name="user"
                    type="text"
                    class="selection:bg-blue-neutral focus:bg-blue-white flex w-[250px] rounded-xl selection:text-white
                                      {sign_in ? 'bg-light-gray' : ''}
                                      {form?.message ? 'border-buhay-red border-[2px]' : ''} "
                    placeholder="Username"
                    disabled={sign_in}
                    required
                />
            </div>

            <div class="flex w-full justify-center {form?.message ? 'mb-5' : 'mb-3'}">
                <div class="relative">
                    <input
                        name="password"
                        type={see_password ? 'text' : 'password'}
                        class="focus:bg-blue-white w-[250px] rounded-xl
                                {sign_in ? 'bg-light-gray' : ''}
                                {form?.message ? 'border-buhay-red border-[2px]' : ''}"
                        placeholder="Password"
                        disabled={sign_in}
                        required
                    />
                    <button
                        onclick={event => {
                            see_password = !see_password;
                            event.preventDefault();
                        }}
                        class="absolute top-[12px] right-4"
                        disabled={sign_in}
                    >
                        {#if see_password}
                            <Eye class="h-5 w-5" />
                        {:else}
                            <EyeClosed class="h-5 w-5" />
                        {/if}
                    </button>
                </div>
            </div>

            <div class="mb-5 flex w-full justify-center {form?.message ? 'visible' : 'invisible'}">
                {#if form?.message}
                    <p class="text-buhay-red font-semibold">{form?.message}</p>
                {/if}
            </div>

            <div class="flex w-full justify-center">
                <button
                    formaction=""
                    class="rounded-2xl px-6 py-3 text-white
                           active:bg-[#144359] active:font-semibold active:text-white active:drop-shadow-xl active:duration-300
                           {!sign_in
                        ? 'bg-blue-neutral w-[100px] font-medium hover:border-black hover:bg-[#a6dcf5] hover:text-black hover:duration-150'
                        : 'w-[200px bg-[#144359] font-semibold drop-shadow-xl'}"
                    disabled={sign_in}
                >
                    {!sign_in ? 'Sign In' : 'Signing In'}</button
                >
            </div>
        </div>
    </div>
</form>
