from transformers import pipeline
import os
# Load the fine-tuned model and tokenizer
model_path = input(r"D:\Projects\HaykuAI\Hajimoto\all_haiku.csv")

# Check if the directory exists
if not os.path.exists(model_path):
    raise FileNotFoundError(f"The directory '{model_path}' does not exist. Please check the path.")

generator = pipeline('text-generation', model=model_path, tokenizer=model_path)

# Generate a haiku
prompt = input("Enter a prompt for your haiku (e.g., 'Moonlight whispers'): ")
output = generator(prompt, max_length=20, num_return_sequences=1, truncation=True)

# Print the generated haiku
print("\nGenerated Haiku:")
print(output[0]['generated_text'])
